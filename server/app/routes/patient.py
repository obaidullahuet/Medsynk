from typing import Union
from fastapi import APIRouter, Depends, status,File,UploadFile
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from app.schema import patient as patientSchema
from config.database import get_db
from app.services import patient as patientService
from app.utils import fileHandler

router = APIRouter(tags=["Patient"])

@router.post("/", status_code=status.HTTP_201_CREATED)
def createPatient(patientData:patientSchema.PatientCreate = Depends(patientSchema.patientFormDependency) 
                #   ,image:UploadFile=File(None),
                    ,image: Union[UploadFile, None, str] = File(None),
                   db: Session = Depends(get_db)):
    if image and isinstance(image, UploadFile):
        patientData.image = fileHandler.saveUploadedFile(image)
    else:
        patientData.image = None
        
    newPatient = patientService.createPatientService(db, patientData)
    return {
        "message": "Patient Created",
        "data": newPatient
    }

@router.get("/")
def getPatients(page: int = 1, limit: int = 10, db: Session = Depends(get_db)):
    patientsData = patientService.getPatientList(page, limit, db)
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
def updatePatient(id: int, patientUpdate: patientSchema.PatientUpdate=Depends(patientSchema.updatePatientDependency)
                  ,image:UploadFile=File(None),
                    db: Session = Depends(get_db)):
    if image and isinstance(image, UploadFile):
        patientUpdate.image = fileHandler.saveUploadedFile(image)

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
