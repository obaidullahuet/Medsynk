from typing import Optional
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
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    about: Optional[str] = None
    address: Optional[str] = None
    createdAt: Optional[date] = None

class PatientOut(PatientBase):
    id: int

    class Config:
        from_attributes = True
