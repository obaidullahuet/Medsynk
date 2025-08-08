from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional

class TreatmentBase(BaseModel):
    treatmentType: str
    about: str
    category: str
    date: Optional[datetime] = None
    appointment_id: Optional[int] = None
    patient_id: Optional[int] = None
    doctor_ids: Optional[List[int]] = []  # many-to-many

class TreatmentCreate(TreatmentBase):
    pass

class TreatmentUpdate(BaseModel):
    treatmentType: Optional[str] = None
    about: Optional[str] = None
    category: Optional[str] = None
    date: Optional[datetime] = None
    appointment_id: Optional[int] = None
    patient_id: Optional[int] = None
    doctor_ids: Optional[List[int]] = None

class TreatmentOut(TreatmentBase):
    id: int

    class Config:
        orm_mode = True
