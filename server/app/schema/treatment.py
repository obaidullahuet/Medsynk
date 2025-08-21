from typing import List, Optional
from datetime import date
from pydantic import BaseModel,Field
from enum import Enum
from fastapi import Form
import json

class TreatmentEnum(str, Enum):
    surgical = "surgical"
    non_surgical = "non_surgical"
    other = "other"

class TreatmentBase(BaseModel):
    name: str
    treatmentType: TreatmentEnum
    description: Optional[str] = None
    about:Optional[str]=None
    createdAt: Optional[date] =None
    # doctorIds: Optional[List[int]] = None
    image:Optional[str] =None
    price:Optional[float] = None

class TreatmentCreate(TreatmentBase):
    pass

class TreatmentUpdate(BaseModel):
    name: Optional[str]=None
    treatmentType: Optional[TreatmentEnum]=None
    about:Optional[str]=None
    description: Optional[str]=None
    createdAt: Optional[date]=None 
    # doctorIds: Optional[List[int]]=None
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
    treatmentType: TreatmentEnum = Form(...),
    about:Optional[str]=Form(...),
    description: Optional[str] = Form(None),
    createdAt: Optional[date] = Form(None),
    # doctorIds: Optional[str] = Form(None),
    price:Optional[float]=Form(None),
   
):
    # print("description",description)
    # description_parsed = json.loads(description) if description and description.strip() else None
    # doctorIds_parsed = json.loads(doctorIds) if doctorIds and doctorIds.strip() else None
    return TreatmentCreate(
        name=name,
        treatmentType=treatmentType,
        about=about,
        # description=json.loads(description) if description else None,
        description=description,
        createdAt=createdAt,
        # doctorIds=json.loads(doctorIds) if doctorIds else None,
        # doctorIds=doctorIds_parsed,
        price=price
    )

def updateTreatmentDependency(
    name: Optional[str] = Form(None),
    about:Optional[str]=Form(None),
    treatmentType: Optional[TreatmentEnum] = Form(None),
    description: Optional[str] = Form(None),
    createdAt: Optional[date] = Form(None),
    # doctorIds: Optional[str] = Form(None),
    price:Optional[float]=Form(None),
):
    # doctorIds_parsed = json.loads(doctorIds) if doctorIds and doctorIds.strip() else None
    return TreatmentUpdate(
        name=name,
        about=about,
        treatmentType=treatmentType,
        description=description if description else None,
        createdAt=createdAt,
        # doctorIds=doctorIds_parsed,
        price=price
    )