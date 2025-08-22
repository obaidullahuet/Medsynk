from pydantic import BaseModel, Field, validator
from datetime import date,time
from typing import List, Optional
from enum import Enum

class AppointmentStatus(str, Enum):
    pending = "pending"
    completed = "completed"
    scheduled = "scheduled"
    cancelled = "cancelled"
    rescheduled = "rescheduled"
    in_progress = "in_progress"

class AppointmentBase(BaseModel):
    scheduledDate: date
    scheduledTime: time
    status: AppointmentStatus = AppointmentStatus.scheduled 
    doctorId: Optional[int] = None
    patientId: Optional[int] = None
    treatmentId:Optional[int]=None


class DoctorOut(BaseModel):
    id: int
    name: str

    class Config:
        from_attributes = True


class PatientOut(BaseModel):
    id: int
    name: str

    class Config:
        from_attributes = True

class TreatmentOut(BaseModel):
    id: int
    name: str

    class Config:
        from_attributes = True

class AppointmentCreate(AppointmentBase):
    pass

class AppointmentUpdate(BaseModel):
    scheduledDate: Optional[date] = None
    scheduledTime: Optional[time] = None
    status: Optional[AppointmentStatus] = None
    doctorId: Optional[int] = None
    patientId: Optional[int] = None
    treatmentId:Optional[int]=None

class AppointmentOut(BaseModel):
    id: int
    scheduledTime: time
    scheduledDate: date
    status: str
    doctorId: DoctorOut = Field(alias="doctor", serialization_alias="doctorId")
    patientId: PatientOut= Field(alias="patient",serialization_alias="patientId")
    treatmentId: TreatmentOut = Field(alias="treatment",serialization_alias="treatmentId")
    

    class Config:
        from_attributes = True  
        populate_by_name = True  # This allows both field name and alias to work




class AppointmentPagination(BaseModel):
    totalCount: int
    pageNumber: int
    totalPages: int
    data: List[AppointmentOut]


class PaginatedAppointmentOut(BaseModel):
    message: str
    data: AppointmentPagination


class AppointmentByIdOut(BaseModel):
    message: str
    data: AppointmentOut