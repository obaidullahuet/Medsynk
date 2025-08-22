from typing import Optional
from fastapi import Form
from pydantic import BaseModel, EmailStr
from datetime import date
from enum import Enum

class GenderEnum(str, Enum):
    male = "male"
    female = "female"
    other = "other"

class PatientBase(BaseModel):
    name: str
    age: Optional[int] = None  
    dob: date
    gender: Optional[GenderEnum] = GenderEnum.male 
    emergencyContact: Optional[str] = None
    email: EmailStr
    phone: str
    image:Optional[str] = None
    about: Optional[str] = None
    address: Optional[str] = None
    createdAt: Optional[date] = None

class PatientCreate(PatientBase):
    pass

class PatientUpdate(BaseModel):
    name: Optional[str] = None
    age: Optional[int] = None
    dob: Optional[date] = None
    gender: Optional[GenderEnum] = None
    emergencyContact: Optional[str] = None
    image:Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    about: Optional[str] = None
    address: Optional[str] = None
    createdAt: Optional[date] = None

class PatientOut(PatientBase):
    id: int

    class Config:
        from_attributes = True


def patientFormDependency(
    name: str = Form(...),
    age: Optional[int] = Form(None),
    dob: date = Form(...),
    gender: GenderEnum = Form(...),
    emergencyContact: Optional[str] = Form(None),
    email: EmailStr = Form(...),
    phone: str = Form(...),
    about: Optional[str] = Form(None),
    address: Optional[str] = Form(None),
    createdAt: Optional[date] = Form(None),
):
    return PatientCreate(
        name=name,
        age=age,
        dob=dob,
        gender=gender,
        emergencyContact=emergencyContact,
        email=email,
        phone=phone,
        about=about,
        address=address,
        createdAt=createdAt,
    )

def updatePatientDependency(
    name: Optional[str] = Form(None),
    age: Optional[int] = Form(None),
    dob: Optional[date] = Form(None),
    gender: Optional[GenderEnum] = Form(None),
    emergencyContact: Optional[str] = Form(None),
    email: Optional[EmailStr] = Form(None),
    phone: Optional[str] = Form(None),
    about: Optional[str] = Form(None),
    address: Optional[str] = Form(None),
    createdAt: Optional[date] = Form(None),
):
    return PatientUpdate(
        name=name,
        age=age,
        dob=dob,
        gender=gender,
        emergencyContact=emergencyContact,
        email=email,
        phone=phone,
        about=about,
        address=address,
        createdAt=createdAt,
    )
