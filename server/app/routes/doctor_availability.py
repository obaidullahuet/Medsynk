from fastapi import APIRouter
from sqlalchemy.orm import Session
from app.models import DoctorAvailability
from config.database import get_db
from fastapi import Depends
from app.schema import doctor_availability as DoctorAvailabilitySchema


router=APIRouter(tags=["Doctor Availability"])


# ========================== POST ==================================
@router.post('/add')
def addDoctorAvailability(availability:DoctorAvailabilitySchema.createDoctorAvailability,db: Session = Depends(get_db)):

    return {
        "message": "Doctor availability added successfully",
        "data": availability
    }

# ========================== GET ==================================
@router.get('/doctor/{id}')
def getDoctorAvailabilityByDoctorId(id:int, db: Session = Depends(get_db)):
    # doctorAvailability = db.query(DoctorAvailability).filter(DoctorAvailability.doctorId == id).all()
    # if not doctorAvailability:
    #     return {
    #         "message": "No availability found for this doctor",
    #         "data": []
    #     }
    return {
        "message": "Doctor availability retrieved successfully",
        # "data": doctorAvailability
    }

@router.get('/{id}')
def getDoctorAvailability(id:int,db: Session = Depends(get_db)):
    # doctorAvailability = db.query(DoctorAvailability).filter(DoctorAvailability.id == id).first()
    # if not doctorAvailability:
    #     return {
    #         "message": "Doctor availability not found",
    #         "data": None
    #     }
    return {
        "message": "Doctor availability retrieved successfully",
        # "data": doctorAvailability
    }

# ========================== PUT & DELETE ==================================

@router.put('/update/{id}')
def updateDoctorAvailability(id: int, availability: DoctorAvailabilitySchema.DoctorAvailabilityUpdate, db: Session = Depends(get_db)):
    # doctorAvailability = db.query(DoctorAvailability).filter(DoctorAvailability.id == id).first()
    # if not doctorAvailability:
    #     return {
    #         "message": "Doctor availability not found",
    #         "data": None
    #     }
    
    # for key, value in availability.dict().items():
    #     setattr(doctorAvailability, key, value)
    
    # db.commit()
    
    return {
        "message": "Doctor availability updated successfully",
        # "data": doctorAvailability
    }

@router.delete('/delete/{id}')
def deleteDoctorAvailability(id: int, db: Session = Depends(get_db)):
    # doctorAvailability = db.query(DoctorAvailability).filter(DoctorAvailability.id == id).first()
    # if not doctorAvailability:
    #     return {
    #         "message": "Doctor availability not found",
    #         "data": None
    #     }
    
    # db.delete(doctorAvailability)
    # db.commit()
    
    return {
        "message": "Doctor availability deleted successfully",
        # "data": None
    }