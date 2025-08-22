from sqlalchemy.orm import Session
from math import ceil
from sqlalchemy.orm import joinedload
from app.models import PatientMedicalInfo

from app.schema import patient_medical_info as medicalInfoSchema 

def createPatientMedicalInfo(medicalInfoData:medicalInfoSchema.MedicalInfoCreate,db: Session):
    new_medical_info = PatientMedicalInfo(**medicalInfoData.dict()) 
    db.add(new_medical_info)
    db.commit()
    db.refresh(new_medical_info)
    return new_medical_info

def getPatientMedicalInfo(id:int, db: Session):
    medicalInfo = db.query(PatientMedicalInfo).filter(PatientMedicalInfo.id==id).first()
    return medicalInfo

def getPatientMedicalInfoByPatientId(patientId:int, db: Session):
    medicalInfo = db.query(PatientMedicalInfo).filter(PatientMedicalInfo.patientId==patientId).all()
    return medicalInfo

def updatePatientMedicalInfo(id:int, medicalInfoData:medicalInfoSchema.MedicalInfoUpdate, db: Session):
    medicalInfo = db.query(PatientMedicalInfo).filter(PatientMedicalInfo.id==id).first()
    if not medicalInfo:
        return None
    for key, value in medicalInfoData.dict(exclude_unset=True).items():
        setattr(medicalInfo, key, value)
    db.commit()
    db.refresh(medicalInfo)
    return medicalInfo

def deletePatientMedicalInfo(id:int, db: Session):
    medicalInfo = db.query(PatientMedicalInfo).filter(PatientMedicalInfo.id==id).first()
    if not medicalInfo:
        return None
    db.delete(medicalInfo)
    db.commit()
    return medicalInfo



