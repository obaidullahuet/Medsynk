
from app.schema import doctor as DoctorSchema
from app.models import Doctor, Treatment
from sqlalchemy.orm import Session
from math import ceil
from sqlalchemy.orm import joinedload




# Create Doctor
def createDoctor(db:Session,doctor:DoctorSchema.DoctorCreate):
    print(doctor)
    newDoctor=Doctor(
        name=doctor.name,
        specialty=doctor.specialty,
        contact=doctor.contact,
        email=doctor.email,
        address=doctor.address,
        experience=doctor.experience,
        about=doctor.about,
        available=doctor.available,
        slotDuration=doctor.slotDuration,
        createdAt=doctor.createdAt,
        profilePhoto=doctor.profilePhoto,
    )
    if doctor.treatmentIds:
        treatmentArrays=doctor.treatmentIds.split(",")
        
        treatments = db.query(Treatment).filter(Treatment.id.in_(treatmentArrays)).all()
        
        newDoctor.treatments.extend(treatments)
        
    if doctor.slotDuration is None or doctor.slotDuration==0:
        doctor.slotDuration = 15
    # newDoctor = Doctor(**doctor.dict())
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
    doctorDetail= db.query(Doctor).options(joinedload(Doctor.treatments)).filter(Doctor.id == doctorId).first()
    return doctorDetail

#  UPDATE DOCTOR
def update_doctor(doctor_id: int, updatedDoctor: DoctorSchema.DoctorUpdate, db: Session):
    try:
        doctor = db.query(Doctor).filter(Doctor.id == doctor_id).first()
        if not doctor:
            return None  
        
        updateData = updatedDoctor.dict(exclude_unset=True)

        # Default slotDuration if not provided
        if "slotDuration" not in updateData or updateData.get("slotDuration") is None:
            updateData["slotDuration"] = 15

        # Handle treatmentIds update
        if "treatmentIds" in updateData and updateData["treatmentIds"] is not None:
            treatmentArrays = updateData["treatmentIds"]
            # If coming as comma-separated string → convert to list
            if isinstance(treatmentArrays, str):
                treatmentArrays = [int(t.strip()) for t in treatmentArrays.split(",") if t.strip().isdigit()]
            
            treatments = db.query(Treatment).filter(Treatment.id.in_(treatmentArrays)).all()
            doctor.treatments = treatments  # overwrite relations

            # remove from updateData so it doesn't conflict with setattr
            updateData.pop("treatmentIds")

        # Apply other updates
        for key, value in updateData.items():
            setattr(doctor, key, value)

        db.commit()
        db.refresh(doctor)
        return doctor

    except Exception as e:
        db.rollback()  # rollback on error
        print(f"Error updating doctor: {e}")
        return {"error": str(e)}

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
