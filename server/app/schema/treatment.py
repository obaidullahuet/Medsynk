from typing import List, Optional
from datetime import date
from pydantic import BaseModel,Field
from enum import Enum
from fastapi import Form
import json

class TreatmentType(str, Enum):
    surgical = "surgical"
    non_surgical = "non_surgical"
    other = "other"

class TreatmentBase(BaseModel):
    name: str
    treatmentType: TreatmentType
    description: Optional[str] = None
    createdAt: Optional[date] =None
    doctorIds: Optional[List[int]] = None
    image:Optional[str] =None
    price:Optional[float] = None

class TreatmentCreate(TreatmentBase):
    pass

class TreatmentUpdate(BaseModel):
    name: Optional[str]=None
    treatmentType: Optional[TreatmentType]=None
    description: Optional[str]=None
    createdAt: Optional[date]=None 
    doctorIds: Optional[List[int]]=None
    image: Optional[str]=Form(None)
    price: Optional[float]=None

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


def treatmentFormDependency(
    name: str = Form(...),
    treatmentType: str = Form(...),
    description: Optional[str] = Form(None),
    createdAt: Optional[date] = Form(None),
    doctorIds: Optional[str] = Form(None),
    price:Optional[float]=Form(None),
   
):
    return TreatmentCreate(
        name=name,
        treatmentType=treatmentType,
        description=description,
        createdAt=createdAt,
        doctorIds=json.loads(doctorIds) if doctorIds else None,
        price=price
    )

def updateTreatmentDependency(
    name: Optional[str] = Form(None),
    treatmentType: Optional[TreatmentType] = Form(None),
    description: Optional[str] = Form(None),
    createdAt: Optional[date] = Form(None),
    doctorIds: Optional[str] = Form(None),
    price:Optional[float]=Form(None),
):
    return TreatmentUpdate(
        name=name,
        treatmentType=treatmentType,
        description=description,
        createdAt=createdAt,
        doctorIds=json.loads(doctorIds) if doctorIds else None,
        price=price
    )