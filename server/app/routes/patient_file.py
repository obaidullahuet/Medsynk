from typing import Union
from fastapi import APIRouter ,HTTPException,Depends,File,UploadFile
from sqlalchemy.orm import Session
from app.schema import patient_file as patientFileSchema
from app.services import patient_file as PatientService
from app.utils.fileHandler import saveUploadedFile

from config.database import get_db


router=APIRouter(tags=["Patient Files"])


@router.post("/")
def createPatientFile(patientFileData:patientFileSchema.PatientFileCreate=Depends(patientFileSchema.patientFileForm),image: Union[UploadFile, None, str] = File(None),db:Session=Depends(get_db)):
    if image and isinstance(image,UploadFile):
        patientFileData.fileUrl=saveUploadedFile(image)
        patientFileData.fileName=image.filename
    else:
        return HTTPException(status_code=400, detail="Image is required")
    newPatientFile=PatientService.createPatientFile(patientFileData,db)
    return {
        "message":"Patient File created successfully",
        "data":newPatientFile
    }
