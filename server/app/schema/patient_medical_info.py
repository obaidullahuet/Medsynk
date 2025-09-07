from datetime import datetime
from fastapi import Form
from pydantic import BaseModel, Field
from typing import Any, Dict, List, Optional
import json


class BaseMedicalInfo(BaseModel):
    patientId: int
    bloodGroup: str
    bodyTemperature: str
    heartRate: str
    respirationRate: str
    # file:Optional[str]=None
    bloodPressure: str
    appointmentId:int
    icdCode:str=None
    cptCode:str=None
    notes: Optional[Dict[str, Any]]=None  # Dict for JSON structure
    
    createdAt: datetime

class MedicalInfoCreate(BaseMedicalInfo):
    pass

class MedicalInfoOut(BaseMedicalInfo):
    id: int

    class Config:
        from_attributes = True

class MedicalInfoUpdate(BaseModel):
    patientId: Optional[int]
    bloodGroup: Optional[str]
    bodyTemperature: Optional[str]
    heartRate: Optional[str]
    respirationRate: Optional[str]
    appointmentId:Optional[int]
    bloodPressure: Optional[str]
    notes: Optional[Dict[str, Any]]
    # icdCode:Optional[str]
    # cptCode:Optional[str]

def MedicalFormDependency(
    patientId:str=Form(...),
    bloodGroup: str=Form(...),
    bodyTemperature: str=Form(...),
    heartRate: str=Form(...),
    respirationRate: str=Form(...),
    bloodPressure: str=Form(...),
    appointmentId:str=Form(...),
    # icdCode:str=Form(None),
    # cptCode:str=Form(None),
    # notes: Optional[Dict[str, Any]]=Form(None),
    notes:str=Form(None),
    createdAt: datetime=Form(None),
    
):
    if notes:
        notes = json.loads(notes)
    return BaseMedicalInfo(
        patientId=int(patientId),
        bloodGroup=bloodGroup,
        bodyTemperature=bodyTemperature,
        heartRate=heartRate,
        respirationRate=respirationRate,
        bloodPressure=bloodPressure,
        appointmentId=int(appointmentId),
        # icdCode=icdCode,
        # cptCode=cptCode,
        notes=notes,
        createdAt=createdAt,
    )
    
