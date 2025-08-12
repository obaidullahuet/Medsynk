from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.models import Patient
from math import ceil
from app.schema.patient import PatientCreate, PatientUpdate

def createPatientService(db: Session, patientData: PatientCreate):
    dbPatient = Patient(**patientData.dict())
    db.add(dbPatient)
    db.commit()
    db.refresh(dbPatient)
    return dbPatient

# ========================= Get Patient Detail service ===========

def getPatientService(db: Session, patientId: int):
    patient = db.query(Patient).filter(Patient.id == patientId).first()
    if not patient:
        return None
    return patient

# ========== Update Patient Service ===================

def updatePatientService(db: Session, patientId: int, patientUpdate: PatientUpdate):
    patient = db.query(Patient).filter(Patient.id == patientId).first()
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")

    for field, value in patientUpdate.dict(exclude_unset=True).items():
        setattr(patient, field, value)

    db.commit()
    db.refresh(patient)
    return patient

# ========================= Delete Patient Service ===========

def deletePatientService(db: Session, patientId: int):
    patient = db.query(Patient).filter(Patient.id == patientId).first()
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    
    db.delete(patient)
    db.commit()

# ========================= Get Patient List Service ===========

def getPatientList(skip: int, limit: int, db: Session):
    patientList = db.query(Patient).offset(skip).limit(limit).all()
    totalCount = db.query(Patient).count()
    pageNumber = (skip // limit) + 1 if limit else 1
    totalPages = ceil(totalCount / limit) if limit else 1
    return {
        "total": totalCount,
        "pageNumber": pageNumber,
        "totalPages": totalPages,
        "data": patientList,
    }
