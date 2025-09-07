from fastapi import APIRouter ,Depends, File, Form,HTTPException, UploadFile
from sqlalchemy.orm import Session
from config.database import get_db
from app.services import patient_medical_info as PatientMedicalInfoService
from app.schema import patient_medical_info as medicalInfoSchema
import base64
import requests
API_URL = "http://localhost:3000/api/v1/prediction/099cbfeb-b30e-4743-99c4-2fb742dc73c7"
import json



router=APIRouter(tags=['Patient Medical Info'])



@router.post('/')
async def createPatientMedicalInfo(medicalInfoData:medicalInfoSchema.MedicalInfoCreate=Depends(medicalInfoSchema.MedicalFormDependency)
                            , audioFile: UploadFile= File(None),
                             db: Session = Depends(get_db)):
    
    print(".....",medicalInfoData)
    # if audioFile:
        #  audio_bytes =await audioFile.read()
        #  encoded = base64.b64encode(audio_bytes).decode("utf-8")
        #  mime_type = "audio/webm"
    # payload = {
    #     "uploads": [
    #         {
    #             "data": f"data:{mime_type};base64,{encoded}",
    #             "type": "audio",
    #             "name": f"{audioFile.filename.rsplit('.', 1)[0]}.m4a",
    #             "mime": mime_type
    #         }
    #     ]
    # }
    # response = requests.post(API_URL, json=payload)
    
    # response_dict = response.json()  
    # extracted_text = response_dict.get("text", "")
    # extracted_text_dict = json.loads(extracted_text)
    # print(extracted_text_dict)
    # summary = schema.MedicalSummary(**extracted_text_dict)
    # medicalInfoData.notes = extracted_text_dict
    creation=PatientMedicalInfoService.createPatientMedicalInfo(medicalInfoData,db)
    if "error" in creation:
        raise HTTPException(status_code=400, detail=creation["error"])
    return {
        "message": "Patient Medical Info created successfully",
        "data": creation["data"]
    }


@router.get('/{id}')
def getPatientMedicalInfo(id:int,db: Session = Depends(get_db)):
    print(id)
    patientMedicalInfo = PatientMedicalInfoService.getPatientMedicalInfo(id,db)
    if patientMedicalInfo is None:
        raise HTTPException(status_code=404, detail="Medical Info not found")
    return {
        "message": f"Medical Info Detail",
        "data": patientMedicalInfo
    }

@router.get('/patient/{id}')
def getPatientMedicalInfoByPatientId(id:int,page:int=1,limit:int=1, db: Session = Depends(get_db)):
    
    patientMedicalInfo = PatientMedicalInfoService.getPatientMedicalInfoByPatientId(id,page,limit, db)
    if patientMedicalInfo is None:
        raise HTTPException(status_code=404, detail="Medical Info not found")
    return {
        "message": f"Medical Info Detail",
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