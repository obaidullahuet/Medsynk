from sqlalchemy.orm import Session
from app.models import Treatment, Doctor,treatment_doctor
from app.schema.treatment import TreatmentCreate, TreatmentUpdate
from datetime import date
from math import ceil
from sqlalchemy.orm import joinedload
from urllib.parse import unquote


# CREATE
def createTreatmentService(db: Session, treatmentData: TreatmentCreate):
    treatment = Treatment(
        name=treatmentData.name,
        treatmentType=treatmentData.treatmentType,
        description=treatmentData.description,
        image=treatmentData.image,
        price=treatmentData.price,
        about=treatmentData.about,
        createdAt=date.today()
    )

    # if treatmentData.doctorIds:
    #     doctors = db.query(Doctor).filter(Doctor.id.in_(treatmentData.doctorIds)).all()
    #     treatment.doctors.extend(doctors)

    db.add(treatment)
    db.commit()
    db.refresh(treatment)
    return treatment

# READ ALL
def getAllTreatmentsService(page: int, limit: int,search: str,filter: str, db: Session):
    skip = (page - 1) * limit
    
    if search and search != '':
        search=search.split()[0]
        treatmentList = db.query(Treatment).filter(Treatment.name.ilike(f"%{search}%")).offset(skip).limit(limit).all()
    else:
        treatmentList = db.query(Treatment).offset(skip).limit(limit).all()
    totalCount = db.query(Treatment).count()
    pageNumber = (skip // limit) + 1 if limit else 1
    totalPages = ceil(totalCount / limit) if limit else 1
    return {
        "totalCount": totalCount,
        "pageNumber": pageNumber,
        "totalPages": totalPages,
        "data": treatmentList,
    }

# READ BY ID
def getTreatmentByIdService(db: Session, treatmentId: int):
    tretamentDetail= db.query(Treatment).options(joinedload(Treatment.doctors)).filter(Treatment.id == treatmentId).first()
    return tretamentDetail
# UPDATE
def updateTreatmentService(db: Session, treatmentId: int, updateData: TreatmentUpdate):
    treatment = db.query(Treatment).filter(Treatment.id == treatmentId).first()
    if not treatment:
        return None
    for field, value in updateData.dict(exclude_unset=True).items():
        print(field, value)
        # if value is None:
        #     continue
        # if field == "doctorIds" and value is not None:
        #     treatment.doctors.clear()
        #     doctors = db.query(Doctor).filter(Doctor.id.in_(value)).all()
        #     treatment.doctors.extend(doctors)
        # else:
        setattr(treatment, field, value)

    db.commit()
    db.refresh(treatment)
    return treatment

# DELETE
def deleteTreatmentService(db: Session, treatmentId: int):
    treatment = getTreatmentByIdService(db, treatmentId)
    if not treatment:
        return None
    db.delete(treatment)
    db.commit()
    return treatment

 
# ====================Get Doctors  against a Treatment================ 
def getDoctorsByTreatmentIdService(treatmentId: int,db: Session ):
    doctors = db.query(Doctor).join(
        treatment_doctor, Doctor.id==treatment_doctor.c.doctorId
    ).filter(treatment_doctor.c.treatmentId==treatmentId).all()
    if not doctors:
        return None
    return doctors