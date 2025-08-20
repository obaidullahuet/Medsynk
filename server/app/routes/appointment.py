# routes/appointment_route.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from config.database import get_db
from app.services import appointment as AppointmentService
from app.schema import appointment as AppointmentSchema
from typing import List
from app.middlewares.auth_middleware import requirePermission

router = APIRouter(prefix="/appointment", tags=["Appointments"])

# 
@router.get("/",response_model=AppointmentSchema.PaginatedAppointmentOut,dependencies=[Depends(requirePermission("appointment-view"))])
def getAllAppointments(page:int=1,limit:int=10,db: Session = Depends(get_db)):
    apptList= AppointmentService.getAllAppointmentsService(page,limit,db)
    return {
        "message": "All Appointments",
        "data": apptList
    }


@router.get("/{id}",dependencies=[Depends(requirePermission("appointment-view"))])
def getAppointment(id: int, db: Session = Depends(get_db)):
    appointment = AppointmentService.getAppointmentByIdService(db,id)
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")
    return {
        "message": "Appointment Details",
        "data": appointment
    }


@router.post("/",dependencies=[Depends(requirePermission("appointment-create"))])
def create_appointment(appointment:AppointmentSchema.AppointmentCreate , db: Session = Depends(get_db)):

    newAppt= AppointmentService.createAppointmentService(db, appointment)
    if "error" in newAppt:
        raise HTTPException(status_code=400, detail=newAppt["error"])
    return {
        "message": "Appointment created successfully",
        "data": newAppt["data"]
    }


@router.put("/{id}",dependencies=[Depends(requirePermission("appointment-update"))])
def update_appointment(id: int, appointment_update: AppointmentSchema.AppointmentUpdate, db: Session = Depends(get_db)):
    updated = AppointmentService.updateAppointmentService(db, id, appointment_update)
    if "error" in updated:
        raise HTTPException(status_code=400, detail=updated["error"])
    return {
        "message": "Appointment created successfully",
        "data": updated["data"]
    }

@router.delete("/{id}",dependencies=[Depends(requirePermission("appointment-delete"))])
def delete_appointment(id: int, db: Session = Depends(get_db)):
    deleted = AppointmentService.deleteAppointmentService(db, id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Appointment not found")
    return {"message": "Appointment deleted successfully"}
