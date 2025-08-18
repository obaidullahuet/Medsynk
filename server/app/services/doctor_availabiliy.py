from app.schema import doctor_availability as doctorAvailabilitySchema
from sqlalchemy.orm import Session
from app.models import DoctorAvailability
from datetime import datetime
from app.models import Doctor
from sqlalchemy import func




def createDoctorAvailability(availability:doctorAvailabilitySchema.createDoctorAvailability,db:Session):
    new_availability = DoctorAvailability(**availability.dict())

    #  add the createdAt 
    new_availability.createdAt=datetime.utcnow()

    # check if the doctor is there or not 
    isDoctorExist=db.query(Doctor).filter(Doctor.id == availability.doctorId).first()
    if not isDoctorExist:
        return {"error": "doctor_not_found"}
    
    exist = db.query(DoctorAvailability).filter(
    DoctorAvailability.doctorId == availability.doctorId,
    func.lower(DoctorAvailability.day) == availability.day.lower() 
    ).first()    

    if exist:
        return {"error": "availability_exists"}
    
    db.add(new_availability)
    db.commit()
    db.refresh(new_availability)
    return {"data": new_availability}  # wrap in a dict

def getDoctorAvailabilityByDoctorId(doctorId:int, db:Session):
    return db.query(DoctorAvailability).filter(DoctorAvailability.doctorId == doctorId).all()

def getDoctorAvailabilityById(id:int, db:Session):
    return db.query(DoctorAvailability).filter(DoctorAvailability.id == id).first()

def updateDoctorAvailability(id:int, updated_availability:doctorAvailabilitySchema.DoctorAvailabilityUpdate, db:Session):
    availability = db.query(DoctorAvailability).filter(DoctorAvailability.id == id).first()
    if not availability:
        return None
    if availability:
        update_data = updated_availability.dict(exclude_unset=True)
        for key, value in update_data.items():
            setattr(availability, key, value)
        db.commit()
        db.refresh(availability)
        return availability

def deleteDoctorAvailability(id:int, db:Session):
    availability = db.query(DoctorAvailability).filter(DoctorAvailability.id == id).first()
    if not availability:
        return None
    if availability:
        db.delete(availability)
        db.commit()
        return True
    