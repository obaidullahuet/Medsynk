# services/appointment_service.py
from datetime import timedelta
from sqlalchemy import and_, func
from sqlalchemy.orm import Session
from app.models import Appointment,Doctor,DoctorAvailability, Patient, Treatment
from app.schema.appointment import AppointmentCreate, AppointmentUpdate
from math import ceil
from sqlalchemy.orm import joinedload
from datetime import datetime, timedelta


def createAppointmentService(db: Session, appointment_data: AppointmentCreate):
    # 1. Check if doctor exists
    doctor = db.query(Doctor).filter(Doctor.id == appointment_data.doctorId).first()
    if not doctor:
        return {"error":"Doctor not found"}

    # 2. Check doctor's availability for the requested day
    day_name = appointment_data.scheduledDate.strftime("%A").lower()
    availability = db.query(DoctorAvailability).filter(
        DoctorAvailability.doctorId == doctor.id,
        func.lower(DoctorAvailability.day) == day_name
    ).first()
    if not availability:
        return {"error":f"Doctor availability not found"}

    # 3. Validate requested time within availability
    requested_time = appointment_data.scheduledTime  # naive time
    start_time = availability.startTime
    end_time = availability.endTime

    if requested_time < start_time or requested_time >= end_time:
        return {"error":f"Requested time not in doctor's availability"}

    # 4. Determine appointment slot duration
    slot_duration = doctor.slotDuration or 15
    requested_start = datetime.combine(appointment_data.scheduledDate, requested_time)
    requested_end = requested_start + timedelta(minutes=slot_duration)

    # 5. Check for overlapping appointments
    appointments_on_date = db.query(Appointment).filter(
    Appointment.doctorId == doctor.id,
    Appointment.scheduledDate == appointment_data.scheduledDate
    ).all()

    existing_appointment = next(
    (
        appt for appt in appointments_on_date
        if datetime.combine(appt.scheduledDate, appt.scheduledTime) < requested_end
        and (datetime.combine(appt.scheduledDate, appt.scheduledTime) + timedelta(minutes=slot_duration)) > requested_start
    ),
    None
    )

    if existing_appointment:
         return {"error": "Slot already booked"}

    # 6. Create new appointment
    new_appointment = Appointment(
        scheduledDate=appointment_data.scheduledDate,
        scheduledTime=appointment_data.scheduledTime,
        status=appointment_data.status,
        doctorId=appointment_data.doctorId,
        patientId=appointment_data.patientId,
        treatmentId=appointment_data.treatmentId
    )

    db.add(new_appointment)
    db.commit()
    db.refresh(new_appointment)

    return {"data":new_appointment}


def getAllAppointmentsService(page:int,limit:int,db: Session):
    skip = (page - 1) * limit
    apptList= db.query(Appointment).options(joinedload(Appointment.patient).load_only(Patient.id,Patient.name),
                                            joinedload(Appointment.doctor).load_only(Doctor.id, Doctor.name),
                                            joinedload(Appointment.treatment).load_only(Treatment.id, Treatment.name)).offset(skip).limit(limit).all()
    totalCount = db.query(Appointment).count()
    pageNumber = (skip // limit) + 1 if limit else 1
    totalPages = ceil(totalCount / limit) if limit else 1
    return {
        "totalCount": totalCount,
        "pageNumber": pageNumber,
        "totalPages": totalPages,
        "data": apptList,
    }



def getAppointmentByIdService(db: Session, appointmentId: int):
    return db.query(Appointment).options(joinedload(Appointment.patient), 
    joinedload(Appointment.doctor),
    joinedload(Appointment.treatment).load_only(Treatment.id,Treatment.name)).filter(Appointment.id == appointmentId).first()


def updateAppointmentService(db: Session, appointment_id: int, appointment_data: AppointmentUpdate):
    # 1. Fetch the appointment to update
    appointment = db.query(Appointment).filter(Appointment.id == appointment_id).first()
    if not appointment:
        return {"error": "Appointment not found"}

    # 2. Check if doctor exists
    doctor = db.query(Doctor).filter(Doctor.id == appointment_data.doctorId).first()
    if not doctor:
        return {"error": "Doctor not found"}

    # 3. Check doctor's availability for the requested day
    day_name = appointment_data.scheduledDate.strftime("%A").lower()
    availability = db.query(DoctorAvailability).filter(
        DoctorAvailability.doctorId == doctor.id,
        func.lower(DoctorAvailability.day) == day_name
    ).first()
    if not availability:
        return {"error": "Doctor availability not found"}

    # 4. Validate requested time within availability
    requested_time = appointment_data.scheduledTime
    start_time = availability.startTime
    end_time = availability.endTime
    if requested_time < start_time or requested_time >= end_time:
        return {"error": "Requested time not in doctor's availability"}

    # 5. Determine appointment slot duration and requested start/end
    slot_duration = doctor.slotDuration or 15
    requested_start = datetime.combine(appointment_data.scheduledDate, requested_time)
    requested_end = requested_start + timedelta(minutes=slot_duration)

    # 6. Check for overlapping appointments (exclude current appointment)
    appointments_on_date = db.query(Appointment).filter(
        Appointment.doctorId == doctor.id,
        Appointment.scheduledDate == appointment_data.scheduledDate,
        Appointment.id != appointment_id  # exclude current
    ).all()

    overlapping = next(
        (
            appt for appt in appointments_on_date
            if datetime.combine(appt.scheduledDate, appt.scheduledTime) < requested_end
            and (datetime.combine(appt.scheduledDate, appt.scheduledTime) + timedelta(minutes=slot_duration)) > requested_start
        ),
        None
    )
    if overlapping:
        return {"error": "Slot already booked"}

    # 7. Update appointment fields
    appointment.scheduledDate = appointment_data.scheduledDate
    appointment.scheduledTime = appointment_data.scheduledTime
    appointment.status = appointment_data.status
    appointment.doctorId = appointment_data.doctorId
    appointment.patientId = appointment_data.patientId
    appointment.treatmentId = appointment_data.treatmentId

    db.commit()
    db.refresh(appointment)

    return {"data": appointment}


def deleteAppointmentService(db: Session, appointmentId: int):
    appointment = db.query(Appointment).filter(Appointment.id == appointmentId).first()
    if appointment:
        db.delete(appointment)
        db.commit()
    return appointment


#  ========================= GET THE LIST OF PATIENTS WHOSE APPOINTMENT IS SET===============
def getPatientAppointmentList(skip: int, limit: int, db: Session):
    
    allAppointment=db.query(Appointment).options(joinedload(Appointment.patient)).offset(skip).limit(limit).all();
    # totalCount = db.query(Appointment).filter(Appointment.patientId == patientId).count()
    # pageNumber = (skip // limit) + 1 if limit else 1
    # totalPages = ceil(totalCount / limit) if limit else 1
    return {
        # "total": totalCount,
        # "pageNumber": pageNumber,
        # "totalPages": totalPages,
        "data": allAppointment
    }
