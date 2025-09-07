from sqlalchemy.orm import Session
from math import ceil
from sqlalchemy.orm import joinedload
from app.models import PatientFile
from app.schema import patient_file as patientFileSchema


def createPatientFile(patientFileData: patientFileSchema.PatientFileCreate, db: Session):
    newPatientFile=PatientFile(**patientFileData.dict())
    db.add(newPatientFile)
    db.commit()
    db.refresh(newPatientFile)
    return newPatientFile




