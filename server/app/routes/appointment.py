# routes/appointment_route.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from config.database import get_db
from app.services import appointment as AppointmentService
from app.schema import appointment as AppointmentSchema
from typing import List

router = APIRouter(prefix="/appointment", tags=["Appointments"])


@router.get("/",)
def getAllAppointments(db: Session = Depends(get_db)):
    apptList= AppointmentService.getAllAppointmentsService(db)
    return {
        "message": "All Appointments",
        "data": apptList
    }


@router.get("/{id}}")
def getAppointment(id: int, db: Session = Depends(get_db)):
    appointment = AppointmentService.getAppointmentByIdService(db,id)
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")
    return {
        "message": "Appointment Details",
        "data": appointment
    }


@router.post("/")
def create_appointment(appointment:AppointmentSchema.AppointmentCreate , db: Session = Depends(get_db)):
    newAppt= AppointmentService.createAppointmentService(db, appointment)
    return {
        "message": "Appointment created successfully",
        "data": newAppt
    }


@router.put("/{id}")
def update_appointment(id: int, appointment_update: AppointmentSchema.AppointmentUpdate, db: Session = Depends(get_db)):
    updated = AppointmentService.updateAppointmentService(db, id, appointment_update)
    if not updated:
        raise HTTPException(status_code=404, detail="Appointment not found")
    return {
        "message": "Appointment updated successfully",
        "data": updated
    }


@router.delete("/{id}")
def delete_appointment(id: int, db: Session = Depends(get_db)):
    deleted = AppointmentService.deleteAppointmentService(db, id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Appointment not found")
    return {"message": "Appointment deleted successfully"}
