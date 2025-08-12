from sqlalchemy.orm import Session
from app.models import Treatment, Doctor
from app.schema.treatment import TreatmentCreate, TreatmentUpdate
from datetime import date
from math import ceil
from sqlalchemy.orm import joinedload

# CREATE
def createTreatmentService(db: Session, treatmentData: TreatmentCreate):
    treatment = Treatment(
        name=treatmentData.name,
        treatmentType=treatmentData.treatmentType,
        description=treatmentData.description,
        createdAt=date.today()
    )

    if treatmentData.doctorIds:
        doctors = db.query(Doctor).filter(Doctor.id.in_(treatmentData.doctorIds)).all()
        treatment.doctors.extend(doctors)

    db.add(treatment)
    db.commit()
    db.refresh(treatment)
    return treatment

# READ ALL
def getAllTreatmentsService(skip: int, limit: int, db: Session):
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
    treatment = getTreatmentByIdService(db, treatmentId)
    if not treatment:
        return None
    
    for field, value in updateData.dict(exclude_unset=True).items():
        if field == "doctorIds" and value is not None:
            treatment.doctors.clear()
            doctors = db.query(Doctor).filter(Doctor.id.in_(value)).all()
            treatment.doctors.extend(doctors)
        else:
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
