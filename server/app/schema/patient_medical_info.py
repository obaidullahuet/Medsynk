from datetime import datetime
from pydantic import BaseModel, Field
from typing import List, Optional


class BaseMedicalInfo(BaseModel):
    patientId: int
    bloodGroup: str
    bodyTemperature: str
    heartRate: str
    respirationRate: str
    bloodPressure: str
    appointmentId:int
    icdCode:str
    cptCode:str
    notes:str
    
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
    icdCode:Optional[str]
    cptCode:Optional[str]

