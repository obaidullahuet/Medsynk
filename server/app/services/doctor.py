
from app.schema import doctor as DoctorSchema
from app.models import Doctor
from sqlalchemy.orm import Session
from math import ceil



# Create Doctor
def createDoctor(db:Session,doctor:DoctorSchema.DoctorCreate):
    newDoctor = Doctor(**doctor.dict())
    db.add(newDoctor)
    db.commit()
    db.refresh(newDoctor)
    return newDoctor

# get LIST OF DOCTORS
def getDoctorList(page:int,limit:int,db:Session):
    skip = (page - 1) * limit
    doctorList= db.query(Doctor).offset(skip).limit(limit).all()
    totalCount=db.query(Doctor).count()
    pageNumber = (skip // limit) + 1 if limit else 1
    totalPages = ceil(totalCount / limit) if limit else 1
    return {
        "total": totalCount,
        "currentPage": pageNumber,
        "totalPages": totalPages,
        "data": doctorList,
    }

#  GET DOCTOR BY ID
def getDoctorById(doctorId:int,db:Session ):
    doctorDetail= db.query(Doctor).filter(Doctor.id == doctorId).first()
    return doctorDetail

#  UPDATE DOCTOR
def update_doctor(doctor_id:int, updatedDoctor:DoctorSchema.DoctorUpdate,db:Session):
    doctor = db.query(Doctor).filter(Doctor.id == doctor_id).first()
    if not doctor:
        return None
    if doctor:
        updateData = updatedDoctor.dict(exclude_unset=True)
        if "slotDuration" not in updateData or updateData.get("slotDuration") is None:
           updateData["slotDuration"] = 15
        for key, value in updateData.items():              
          setattr(doctor, key, value)
        db.commit()
        db.refresh(doctor)
        return doctor

# DELETE DOCTOR 
def deleteDoctor(doctorId:int,db:Session,):
    doctor=db.query(Doctor).filter(Doctor.id == doctorId).first()
    if not doctor:
     return None
    if doctor:
        db.delete(doctor)
        db.commit()
        return True
    
# UPLOAD IMAGE
# def update_doctor_image(id:int,photoUrl:str,db:Session):
#     doctor = db.query(Doctor).filter(Doctor.id == id).first()
#     if not doctor:
#         return None
#     if doctor:
#         doctor.profilePhoto = photoUrl
#         db.commit()
#         db.refresh(doctor)
#         return doctor
