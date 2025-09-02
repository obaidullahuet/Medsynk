from typing import List
from fastapi import APIRouter, HTTPException
from sqlalchemy.orm import Session
from app.models import DoctorAvailability
from config.database import get_db
from fastapi import Depends
from app.schema import doctor_availability as DoctorAvailabilitySchema
from app.services import doctor_availabiliy as DoctorAvailabilityService


router=APIRouter(tags=["Doctor Availability"])


# ========================== POST ==================================
@router.post('/add')
def addDoctorAvailability(availability:List[DoctorAvailabilitySchema.createDoctorAvailability],db: Session = Depends(get_db)):
    print("json request",availability)
    newAvailability=DoctorAvailabilityService.createDoctorAvailability(availability, db)

    if "error" in newAvailability:

      if newAvailability["error"] == "doctor_not_found":
        raise HTTPException(status_code=404, detail="Doctor not found")
      if newAvailability["error"] == "availability_exists":
        raise HTTPException(status_code=400, detail="Availability already exists")
    return {
    "message": "Doctor availability added successfully",
    "data": newAvailability["data"]
     }


# ========================== GET ==================================
@router.get('/doctor/{id}')
def getDoctorAvailabilityByDoctorId(id:int, db: Session = Depends(get_db)):
    doctorAvailability=DoctorAvailabilityService.getDoctorAvailabilityByDoctorId(id,db)
    if not doctorAvailability:
        return {
            "message": "No availability found for this doctor",
            "data": []
        }
    return {
        "message": "Doctor availability retrieved successfully",
        "data": doctorAvailability
    }

@router.get('/{id}')
def getDoctorAvailability(id:int,db: Session = Depends(get_db)):
    availabilityDetail=DoctorAvailabilityService.getDoctorAvailabilityById(id, db)
    if not availabilityDetail:
        return {
            "message": "Doctor availability not found",
            "data": None
        }
    return {
        "message": "Doctor availability retrieved successfully",
        "data": availabilityDetail
    }

# ========================== PUT & DELETE ==================================

@router.put('/update/doctor/{id}') 
def updateDoctorAvailability(id: int, availability:List[DoctorAvailabilitySchema.DoctorAvailabilityUpdate], db: Session = Depends(get_db)):
    
    updateAvailability=DoctorAvailabilityService.updateDoctorAvailability(id,availability, db)
    # if "error" in updateAvailability:

    #   if updateAvailability["error"] == "doctor_not_found":
    #     raise HTTPException(status_code=404, detail="Doctor not found")
    #   if updateAvailability["error"] == "availability_exists":
    #     raise HTTPException(status_code=400, detail="Availability already exists")
    return {
    "message": "Doctor availability Updated successfully",
    # "data": updateAvailability["data"]
     }

@router.delete('/delete/{id}')
def deleteDoctorAvailability(id: int, db: Session = Depends(get_db)):
    doctorAvailability=DoctorAvailabilityService.deleteDoctorAvailability(id, db)
    if not doctorAvailability:
        return {
            "message": "Doctor availability not found",
            "data": None
        }
    
   
    return {
        "message": "Doctor availability deleted successfully",
    }
    
@router.get('/')
def getDoctorAvailabilityForDay(doctorId:int,day:str, db: Session = Depends(get_db)):
    doctorAvailability=DoctorAvailabilityService.getDoctorAvailabilityForDay(doctorId,day, db)
    if not doctorAvailability:
        return {
            "message": "No availability found for this day",
            # "data": []
        }
    return {
        "message": "Doctor availability retrieved successfully",
        "data": doctorAvailability
    }