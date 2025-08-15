from datetime import datetime,date
from pydantic import BaseModel
from typing import List, Optional



class DoctorAvailabilityBase(BaseModel):
    doctorId:int
    day:str
    startTime:date
    endTime:date
    createdAt: Optional[datetime] = None


class createDoctorAvailability(DoctorAvailabilityBase):
    pass

class DoctorAvailabilityOut(DoctorAvailabilityBase):
    id: int

    class Config:
        from_attributes = True

class DoctorAvailabilityUpdate(BaseModel):
    doctorId: Optional[int] = None
    day: Optional[str] = None
    startTime: Optional[date] = None
    endTime: Optional[date] = None
    createdAt: Optional[datetime] = None