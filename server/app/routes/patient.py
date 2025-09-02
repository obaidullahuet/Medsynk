from typing import Union
from fastapi import APIRouter, Depends, HTTPException, status,File,UploadFile
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from app.schema import patient as patientSchema
from config.database import get_db
from app.services import patient as patientService
from app.utils import fileHandler
from app.middlewares.auth_middleware import requirePermission

router = APIRouter(tags=["Patient"])

@router.post("/", status_code=status.HTTP_201_CREATED,dependencies=[Depends(requirePermission("patient-create"))])
def createPatient(patientData:patientSchema.PatientCreate = Depends(patientSchema.patientFormDependency) 
                #   ,image:UploadFile=File(None),
                    ,image:UploadFile = File(None),
                   db: Session = Depends(get_db)):
    if image:
        patientData.image = fileHandler.saveUploadedFile(image)
    else:
        patientData.image = None
        
    newPatient = patientService.createPatientService(db, patientData)
    return {
        "message": "Patient Created",
        "data": newPatient
    }

@router.get("/",dependencies=[Depends(requirePermission("patient-view"))])
def getPatients(page: int = 1, limit: int = 10, db: Session = Depends(get_db)):
    patientsData = patientService.getPatientList(page, limit, db)
    return {
        "message": "Patients List",
        **patientsData
    }

@router.get("/{id}",dependencies=[Depends(requirePermission("patient-view"))] )
def getPatient(id: int, db: Session = Depends(get_db)):
    patientDetail = patientService.getPatientService(db, id)
    if patientDetail is None:
        return JSONResponse(status_code=404, content={"message": "Patient not found"})
    return {
        "message": "Patient Detail",
        "data": patientDetail
    }

@router.put("/{id}",dependencies=[Depends(requirePermission("patient-update"))])
def updatePatient(id: int, patientUpdate: patientSchema.PatientUpdate=Depends(patientSchema.updatePatientDependency)
                  ,image: UploadFile = File(None),
                    db: Session = Depends(get_db)):
    if image:
        patientUpdate.image = fileHandler.saveUploadedFile(image)
        
    updatedPatient = patientService.updatePatientService(db, id, patientUpdate)
    return {
        "message": "Patient Updated",
        "data": updatedPatient
    }

@router.delete("/{id}", status_code=status.HTTP_200_OK,dependencies=[Depends(requirePermission("patient-delete"))])
def deletePatient(id: int, db: Session = Depends(get_db)):
    resp = patientService.deletePatientService(db, id)
    
    if resp:  # deletion succeeded
        return {"message": "Patient deleted successfully"}
    else:  # patient not found
        raise HTTPException(status_code=404, detail="Patient not found")
