from sqlalchemy.orm import Session
from math import ceil
from sqlalchemy.orm import joinedload
from app.models import Appointment, PatientMedicalInfo

from app.schema import patient_medical_info as medicalInfoSchema 

def createPatientMedicalInfo(medicalInfoData:medicalInfoSchema.MedicalInfoCreate,db: Session):

        #  Check if the Record Exist
        
    patientMedicalInfo = db.query(PatientMedicalInfo).filter(PatientMedicalInfo.patientId==medicalInfoData.patientId).filter(PatientMedicalInfo.appointmentId==medicalInfoData.appointmentId).first()
    if patientMedicalInfo:
        return {"error":"Record already exist"}
    
        #  Check the Appointment Exist
        
    appointmentExist = db.query(Appointment).filter(Appointment.id == medicalInfoData.appointmentId).first()
    if not appointmentExist:
       print("Appointment does not exist")
       return {"error": "Appointment does not exist"}
   
        #   Creation of the patient medical Record
        
    new_medical_info = PatientMedicalInfo(**medicalInfoData.dict())
     
    db.add(new_medical_info)
    db.commit()
    db.refresh(new_medical_info)
    return {"data":new_medical_info}

def getPatientMedicalInfo(id:int, db: Session):
    medicalInfo = db.query(PatientMedicalInfo).filter(PatientMedicalInfo.id==id).first()
    return medicalInfo

def getPatientMedicalInfoByPatientId(patientId:int,page:int,limit:int, db: Session):
    skip = (page - 1) * limit
    print(patientId,"is here")
    medicalInfo = db.query(PatientMedicalInfo).filter(PatientMedicalInfo.patientId==patientId).order_by(PatientMedicalInfo.createdAt.desc()).offset(skip).limit(limit).all()
    totalCount = db.query(PatientMedicalInfo).filter(PatientMedicalInfo.patientId==patientId).count()
    pageNumber = (skip // limit) + 1 if limit else 1
    totalPages = ceil(totalCount / limit) if limit else 1
    return {
        "totalCount": totalCount,
        "pageNumber": pageNumber,
        "totalPages": totalPages,
        "data": medicalInfo,
    }

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



