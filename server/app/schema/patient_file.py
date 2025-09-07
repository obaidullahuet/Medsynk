from datetime import date
from typing import Optional
from pydantic import BaseModel, Field
from fastapi import Form


# Base schema shared between create/update
class PatientFileBase(BaseModel):
    patientId: int
    fileUrl:Optional[str] =None
    fileName:Optional[str] =None


class PatientFileCreate(PatientFileBase):
    pass


# Schema for reading/output
class PatientFileOut(PatientFileBase):
    id: int

    class Config:
        from_attributes = True  # allows reading from SQLAlchemy model objects


def patientFileForm(
    patientId: int = Form(...),
   
   
):
    return PatientFileCreate(
        patientId=patientId,
    )
