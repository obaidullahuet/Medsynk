from typing import List, Optional, Dict
from fastapi import Form, UploadFile
from pydantic import BaseModel, EmailStr
from datetime import date
import json


class DoctorBase(BaseModel):
    name: str
    specialty:Optional[str]=None
    contact: str
    profilePhoto: Optional[str] = None
    about: Optional[str] = None
    experience: Optional[List[Dict]] = None
    slotDuration: Optional[int] = None
    treatmentIds: Optional[str] = None  
    email: EmailStr
    address: str
    available: Optional[bool] = True
    createdAt: Optional[date] = None

class DoctorCreate(DoctorBase):
    pass

class DoctorOut(DoctorBase):
    id: int

    class Config:
        from_attributes = True

class DoctorUpdate(BaseModel):
    name: Optional[str] = None
    specialty: Optional[str] = None
    contact: Optional[str] = None
    profilePhoto: Optional[str] = None
    about: Optional[str] = None
    experience: Optional[List[Dict]] = None
    treatmentIds: Optional[str] = None
    slotDuration: Optional[int] = None
    email: Optional[EmailStr] = None
    address: Optional[str] = None
    available: Optional[bool] = None
    createdAt: Optional[date] = None



def doctorFormDependency(
    name: str = Form(...),
    specialty: Optional[str] = Form(None),
    contact: str = Form(...),
    # profilePhoto: Optional[UploadFile]= Form(None),
    about: Optional[str] = Form(None),
    experience: Optional[str] = Form(None),  
    slotDuration: Optional[int] = Form(None),
    treatmentIds: Optional[str] = Form(...), 
    email: EmailStr = Form(...),
    address: str = Form(...),
    available: Optional[bool] = Form(True),
    createdAt: Optional[date] = Form(None),
):
    
    parsed_experience = None
    if experience:
        try:
            parsed_experience = json.loads(experience)
        except Exception:
            parsed_experience = None

    parsed_treatments = None
 
    return DoctorBase(
        name=name,
        specialty=specialty,
        contact=contact,
        about=about,
        experience=parsed_experience,
        slotDuration=slotDuration,
        treatmentIds=treatmentIds,
        email=email,
        address=address,
        available=available,
        createdAt=createdAt,
    )

def doctorUpdateFormDependency(
    name: Optional[str] = Form(None),
    specialty: Optional[str] = Form(None),
    contact: Optional[str] = Form(None),
    # profilePhoto: Optional[str] = Form(None),
    about: Optional[str] = Form(None),
    experience: Optional[str] = Form(None),  # JSON string
    slotDuration: Optional[int] = Form(None),
    treatmentIds: Optional[str] = Form(None),  # JSON string
    email: Optional[EmailStr] = Form(None),
    address: Optional[str] = Form(None),
    available: Optional[bool] = Form(None),
    createdAt: Optional[date] = Form(None),
):
    parsed_experience = None
    if experience:
        try:
            parsed_experience = json.loads(experience)
        except Exception:
            parsed_experience = None

    # parsed_treatments = None
    # if treatmentIds:
    #     try:
    #         parsed_treatments = json.loads(treatmentIds)
    #     except Exception:
    #         parsed_treatments = None

    return DoctorBase(   # 🔑 if you have DoctorUpdate schema, use that instead
        name=name,
        specialty=specialty,
        contact=contact,
        # profilePhoto=profilePhoto,
        about=about,
        experience=parsed_experience,
        slotDuration=slotDuration,
        treatmentIds=treatmentIds,
        email=email,
        address=address,
        available=available,
        createdAt=createdAt,
    )