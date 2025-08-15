# services/appointment_service.py
from datetime import timedelta
from sqlalchemy import func
from sqlalchemy.orm import Session
from app.models import Appointment,Doctor,DoctorAvailability
from app.schema.appointment import AppointmentCreate, AppointmentUpdate
from math import ceil
from sqlalchemy.orm import joinedload



def getAllAppointmentsService(skip:int,limit:int,db: Session):
    apptList= db.query(Appointment).offset(skip).limit(limit).all()
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
    return db.query(Appointment).options(joinedload(Appointment.patient), joinedload(Appointment.doctor)).filter(Appointment.id == appointmentId).first()

def createAppointmentService(db: Session, appointment_data: AppointmentCreate):
    # 1️⃣ Check if doctor exists
    doctor = db.query(Doctor).filter(Doctor.id == appointment_data.doctorId).first()
    if not doctor:
        return {"error": "doctor_not_found"}

    # 2️⃣ Get the doctor's availability for that day
    day_name = appointment_data.scheduledAt.strftime("%A").lower()  # "monday", "tuesday", etc.
    availability = db.query(DoctorAvailability).filter(
        DoctorAvailability.doctorId == doctor.id,
        func.lower(DoctorAvailability.day) == day_name
    ).first()
    if not availability:
        return {"error": "doctor not available on this day"}

    # 3️⃣ Check if requested time is within availability
    requested_time = appointment_data.scheduledAt.time()
    if requested_time < availability.startTime or requested_time >= availability.endTime:
        return {"error": "Requested time not in availability"}

    # 4️⃣ Check if slot is already booked
    slot_duration = doctor.slotDuration or 15  # default to 15 min
    overlap_start = appointment_data.scheduledAt
    overlap_end = overlap_start + timedelta(minutes=slot_duration)

    existing_appointment = db.query(Appointment).filter(
        Appointment.doctorId == doctor.id,
        Appointment.scheduledAt < overlap_end,
        (Appointment.scheduledAt + timedelta(minutes=slot_duration)) > overlap_start
    ).first()
    if existing_appointment:
        return {"error": "Slot Already Booked"}

    # 5️⃣ Create appointment
    new_appointment = Appointment(**appointment_data.dict())
    db.add(new_appointment)
    db.commit()
    db.refresh(new_appointment)
    return new_appointment

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
