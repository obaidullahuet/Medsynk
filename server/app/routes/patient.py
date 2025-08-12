from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from app.schema.patient import PatientCreate, PatientOut, PatientUpdate
from config.database import get_db
from app.services import patient as patientService

router = APIRouter(tags=["Patient"])

@router.post("/", status_code=status.HTTP_201_CREATED)
def createPatient(patientData: PatientCreate, db: Session = Depends(get_db)):
    newPatient = patientService.createPatientService(db, patientData)
    return {
        "message": "Patient Created",
        "data": newPatient
    }

@router.get("/")
def getPatients(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    patientsData = patientService.getPatientList(skip, limit, db)
    return {
        "message": "Patients List",
        **patientsData
    }

@router.get("/{id}", )
def getPatient(id: int, db: Session = Depends(get_db)):
    patientDetail = patientService.getPatientService(db, id)
    if patientDetail is None:
        return JSONResponse(status_code=404, content={"message": "Patient not found"})
    return {
        "message": "Patient Detail",
        "data": patientDetail
    }

@router.put("/{id}")
def updatePatient(id: int, patientUpdate: PatientUpdate, db: Session = Depends(get_db)):
    updatedPatient = patientService.updatePatientService(db, id, patientUpdate)
    return {
        "message": "Patient Updated",
        "data": updatedPatient
    }

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def deletePatient(id: int, db: Session = Depends(get_db)):
    patientService.deletePatientService(db, id)
    return {
        "message": "Patient Deleted successfully"
    }
