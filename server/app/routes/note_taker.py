import base64
import json
from fastapi import APIRouter, Form, UploadFile, File,Depends
import requests
from app.schema import note_taker as schema
from sqlalchemy.orm import Session
from config.database import get_db
from app.models import PatientMedicalInfo

router = APIRouter(tags=["Flowise AI"])
API_URL = "http://localhost:3000/api/v1/prediction/099cbfeb-b30e-4743-99c4-2fb742dc73c7"

@router.post("/chat",)
async def chat(file: UploadFile = File(...),db: Session = Depends(get_db)):
    audio_bytes = await file.read()
    encoded = base64.b64encode(audio_bytes).decode("utf-8")
    mime_type = file.content_type or "audio/mpeg"
    payload = {
        "uploads": [
            {
                "data": f"data:{mime_type};base64,{encoded}",
                "type": "audio",
                "name": f"{file.filename.rsplit('.', 1)[0]}.m4a",  # Force .m4a extension
                "mime": "audio/webm"
            }
        ]
    }
    response = requests.post(API_URL, json=payload)
    # print(response.text)
    # return response.json()
    response_dict = response.json()   # <-- convert Response object to dict
    extracted_text = response_dict.get("text", "")
    extracted_text_dict = json.loads(extracted_text)
    # print(extracted_text_dict)
    # summary = schema.MedicalSummary(**extracted_text_dict)
    
    # db.query(PatientMedicalInfo).filter(PatientMedicalInfo.patientId == patientId).filter(PatientMedicalInfo.appointmentId== appointmentId).update({"notes": extracted_text_dict})
    # db.commit()
    
    
    
    return {"medical_summary": extracted_text_dict}
