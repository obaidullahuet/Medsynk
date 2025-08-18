# services/appointment_service.py
from datetime import timedelta
from sqlalchemy import func
from sqlalchemy.orm import Session
from app.models import Appointment,Doctor,DoctorAvailability, Patient, Treatment
from app.schema.appointment import AppointmentCreate, AppointmentUpdate
from math import ceil
from sqlalchemy.orm import joinedload
from datetime import datetime, timedelta


def createAppointmentService(db: Session, appointment_data: AppointmentCreate):

    # Check doctor exists
    doctor = db.query(Doctor).filter(Doctor.id == appointment_data.doctorId).first()
    if not doctor:
        return {"error": "doctor_not_found"}

    # Check doctor's availability for the day
    day_name = appointment_data.scheduledDate.strftime("%A").lower()
    availability = db.query(DoctorAvailability).filter(
        DoctorAvailability.doctorId == doctor.id,
        func.lower(DoctorAvailability.day) == day_name
    ).first()
    if not availability:
       return {"error": "Doctor Availability not found"}

    requested_time = appointment_data.scheduledTime.replace(tzinfo=None)
    start_time = availability.startTime.replace(tzinfo=None)
    end_time = availability.endTime.replace(tzinfo=None)

    if requested_time < start_time or requested_time >= end_time:
       return {"error": "Requested time not in availability"}

    slot_duration = doctor.slotDuration or 15

    overlap_start = datetime.combine(appointment_data.scheduledDate, appointment_data.scheduledTime)
    overlap_end = overlap_start + timedelta(minutes=slot_duration)

    existing_appointment = (
        db.query(Appointment)
        .filter(
            Appointment.doctorId == doctor.id,
            Appointment.scheduledDate == appointment_data.scheduledDate, 
            Appointment.scheduledTime < overlap_end.time(),              
            (Appointment.scheduledTime + timedelta(minutes=slot_duration)) > overlap_start.time()
        )
        .first()
    )
    if existing_appointment:
        return {"error": "Slot Already Booked"}

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
    return {"data": new_appointment}



def getAllAppointmentsService(skip:int,limit:int,db: Session):
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


def updateAppointmentService(db: Session, appointmentId: int, update_data: AppointmentUpdate):
    appointment = db.query(Appointment).filter(Appointment.id == appointmentId).first()
    if appointment:
        for key, value in update_data.dict(exclude_unset=True).items():
            setattr(appointment, key, value)
        db.commit()
        db.refresh(appointment)
    return {"data":appointment}


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
