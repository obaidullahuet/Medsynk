from fastapi import APIRouter ,Depends,HTTPException
from sqlalchemy.orm import Session
from config.database import get_db
from app.services import patient_medical_info as PatientMedicalInfoService
from app.schema import patient_medical_info as medicalInfoSchema


router=APIRouter(tags=['Patient Medical Info'])



@router.get('/{id}')
def getPatientMedicalInfo(id:int,db: Session = Depends(get_db)):
    patientMedicalInfo = PatientMedicalInfoService.getPatientMedicalInfo(id,db)
    if patientMedicalInfo is None:
        raise HTTPException(status_code=404, detail="Medical Info not found")
    return {
        "message": f"Medical Info Detail",
        "data": patientMedicalInfo
    }

@router.get('/patient/{id}')
def getPatientMedicalInfoByPatientId(id:int, db: Session = Depends(get_db)):
    patientMedicalInfo = PatientMedicalInfoService.getPatientMedicalInfoByPatientId(id, db)
    if patientMedicalInfo is None:
        raise HTTPException(status_code=404, detail="Medical Info not found")
    return {
        "message": f"Medical Info Detail",
        "data": patientMedicalInfo
    }

@router.post('/')
def createPatientMedicalInfo(medicalInfoData:medicalInfoSchema.MedicalInfoCreate,db: Session = Depends(get_db)):
    patientMedicalInfo = PatientMedicalInfoService.createPatientMedicalInfo(medicalInfoData,db)
    return {
        "message": "Patient Medical Info created successfully",
        "data": patientMedicalInfo
    }

@router.put('/{id}')
def updatePatientMedicalInfo(id:int, medicalInfoData:medicalInfoSchema.MedicalInfoUpdate, db: Session = Depends(get_db)):
    patientMedicalInfo = PatientMedicalInfoService.updatePatientMedicalInfo(id, medicalInfoData, db)
    if patientMedicalInfo is None:
        raise HTTPException(status_code=404, detail="Medical Info not found")
    return {
        "message": "Patient Medical Info updated successfully",
        "data": patientMedicalInfo
    }

@router.delete('/{id}')
def deletePatientMedicalInfo(id:int, db: Session = Depends(get_db)):
    patientMedicalInfo = PatientMedicalInfoService.deletePatientMedicalInfo(id, db)
    if patientMedicalInfo is None:
        raise HTTPException(status_code=404, detail="Medical Info not found")
    return {
        "message": "Patient Medical Info deleted successfully",
    }