from datetime import datetime,time
from pydantic import BaseModel
from typing import List, Optional



class DoctorAvailabilityBase(BaseModel):
    doctorId:int
    day:str
    startTime:time
    endTime:time
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
    startTime: Optional[time] = None
    endTime: Optional[time] = None
    createdAt: Optional[datetime] = None