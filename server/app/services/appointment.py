# services/appointment_service.py
from sqlalchemy.orm import Session
from app.models import Appointment
from app.schema.appointment import AppointmentCreate, AppointmentUpdate
from math import ceil


def getAllAppointmentsService(skip:int,limit:int,db: Session):
    apptList= db.query(Appointment).offset(skip).lmit(limit).all()
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
    return db.query(Appointment).filter(Appointment.id == appointmentId).first()


def createAppointmentService(db: Session, appointment_data: AppointmentCreate):
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
    return appointment


def deleteAppointmentService(db: Session, appointmentId: int):
    appointment = db.query(Appointment).filter(Appointment.id == appointmentId).first()
    if appointment:
        db.delete(appointment)
        db.commit()
    return appointment
