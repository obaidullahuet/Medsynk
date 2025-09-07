from typing import List
from app.schema import doctor_availability as doctorAvailabilitySchema
from sqlalchemy.orm import Session
from app.models import DoctorAvailability
from datetime import datetime
from app.models import Doctor
from sqlalchemy import func




def createDoctorAvailability(availability:List[doctorAvailabilitySchema.createDoctorAvailability],db:Session):
    try:
      doctorId = availability[0].doctorId
      
      doctorFound=db.query(Doctor).filter(Doctor.id==doctorId).first()
      if not doctorFound:
            print("doctor not found")
            return {"error": "doctor_not_found"}
      createdList=[]
      for avail in availability:
        exist = db.query(DoctorAvailability).filter(
            DoctorAvailability.doctorId == avail.doctorId,
            func.lower(DoctorAvailability.day) == avail.day.lower(),
        ).first()
        print(exist)
        if exist:
            print("availability already exists")
            createdList.append(exist)
            continue
        else:
            new_avail=DoctorAvailability(**avail.dict())
            db.add(new_avail)
            createdList.append(new_avail)
      db.commit()
      for obj in createdList:
            db.refresh(obj)
      return {"data": createdList}
      

    except Exception as e:
      db.rollback()
      print("Error in create availability:", e)
      return {"error": str(e)}


def updateDoctorAvailability(id:int,availability:List[doctorAvailabilitySchema.DoctorAvailabilityUpdate], db:Session):
    try:
      doctorId=id
      doctorFound=db.query(Doctor).filter(Doctor.id==doctorId).first()
      if not doctorFound:
            print("doctor not found")
            return {"error": "doctor_not_found"}
      updatedList=[]
      for avail in availability:
          exist=db.query(DoctorAvailability).filter(DoctorAvailability.doctorId==doctorId,DoctorAvailability.day==avail.day).first()
          
          if exist:
                exist.startTime = avail.startTime
                exist.endTime = avail.endTime
                
                updatedList.append(exist)
          else:
                new_avail=DoctorAvailability(**avail.dict())
                db.add(new_avail) 
                updatedList.append(new_avail)
      db.commit()  
      for obj in updatedList:
                db.refresh(obj)
    
      return {"data": updatedList}

    except Exception as e:
      db.rollback()
      print("Error in update availability:", e)
      return {"error": str(e)}




def getDoctorAvailabilityByDoctorId(doctorId:int, db:Session):
    return db.query(DoctorAvailability).filter(DoctorAvailability.doctorId == doctorId).all()

def getDoctorAvailabilityById(id:int, db:Session):
    return db.query(DoctorAvailability).filter(DoctorAvailability.id == id).first()

def deleteDoctorAvailability(id:int, db:Session):
    availability = db.query(DoctorAvailability).filter(DoctorAvailability.id == id).first()
    if not availability:
        return None
    if availability:
        db.delete(availability)
        db.commit()
        return True
    

def getDoctorAvailabilityForDay(doctorId:int,day:str,db:Session):
    resposne=db.query(DoctorAvailability).filter(DoctorAvailability.doctorId==doctorId).filter(DoctorAvailability.day==day.lower()).first()
    return resposne