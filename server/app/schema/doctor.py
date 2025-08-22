from pydantic import BaseModel
from typing import Optional


from pydantic import BaseModel, EmailStr
from typing import Optional, Dict, List

class DoctorBase(BaseModel):
    name: str
    specialty: str
    contact: str
    profilePhoto: Optional[str] = None
    about: Optional[str] = None
    experience: Dict 
    email: EmailStr
    address: str
    available: Optional[bool] = True
    availability: Optional[Dict] = None  # e.g., { "monday": [{"start": "09:00", "end": "12:00"}], ... }

class DoctorCreate(DoctorBase):
    pass

class DoctorOut(DoctorBase):
    id: int

    class Config:
        from_attributes = True

class DoctorUpdate(BaseModel):
    name: Optional[str]
    specialty: Optional[str]
    contact: Optional[str]
    profilePhoto: Optional[str]
    about: Optional[str]
    experience: Optional[Dict]
    email: Optional[EmailStr]
    address: Optional[str]
    available: Optional[bool]
    availability: Optional[Dict]