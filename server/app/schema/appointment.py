from pydantic import BaseModel, validator
from datetime import datetime
from typing import Optional
from enum import Enum

class AppointmentStatus(str, Enum):
    pending = "pending"
    completed = "completed"
    scheduled = "scheduled"
    cancelled = "cancelled"
    rescheduled = "rescheduled"
    in_progress = "in_progress"

class AppointmentBase(BaseModel):
    scheduledAt: datetime
    status: AppointmentStatus
    # notes: Optional[str] = None
    doctorId: Optional[int] = None
    patientId: Optional[int] = None

class AppointmentCreate(AppointmentBase):
    pass

class AppointmentUpdate(BaseModel):
    scheduledAt: Optional[datetime] = None
    status: Optional[AppointmentStatus] = None
    # notes: Optional[str] = None
    doctorId: Optional[int] = None
    patientId: Optional[int] = None

class AppointmentOut(AppointmentBase):
    id: int

    class Config:
        form_attribute = True
