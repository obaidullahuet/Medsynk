from typing import List, Optional
from datetime import date
from pydantic import BaseModel
from enum import Enum

class TreatmentType(str, Enum):
    surgical = "surgical"
    non_surgical = "non_surgical"
    other = "other"

class TreatmentBase(BaseModel):
    name: str
    treatmentType: TreatmentType
    description: Optional[str] = None
    createdAt: Optional[date] = None
    doctorIds: Optional[List[int]] = []

class TreatmentCreate(TreatmentBase):
    pass

class TreatmentUpdate(BaseModel):
    name: Optional[str] = None
    treatmentType: Optional[TreatmentType] = None
    description: Optional[str] = None
    createdAt: Optional[date] = None
    doctorIds: Optional[List[int]] = None

class TreatmentOut(TreatmentBase):
    id: int

    class Config:
        form_attribtes = True

class PaginatedTreatmentOut(BaseModel):
    message:str
    totalCount: int
    pageNumber: int
    totalPages: int
    data: List[TreatmentOut]

    class Config:
        form_attribtes = True