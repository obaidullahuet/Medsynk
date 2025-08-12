from typing import Optional, Dict
from pydantic import BaseModel, EmailStr
from datetime import date

class DoctorBase(BaseModel):
    name: str
    specialty:Optional[str]=None
    contact: str
    profilePhoto: Optional[str] = None
    about: Optional[str] = None
    experience: Optional[Dict] = None
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
    experience: Optional[Dict] = None
    email: Optional[EmailStr] = None
    address: Optional[str] = None
    available: Optional[bool] = None
    createdAt: Optional[date] = None





# class DoctorCreateForm(BaseModel):
#     name: str
#     specialty: str
#     contact: str
#     profilePhoto: Optional[str] = None
#     about: Optional[str] = None
#     experience: Dict
#     email: EmailStr
#     address: str
#     available: Optional[bool] = True
#     createdAt: Optional[date] = None
