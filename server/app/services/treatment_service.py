from sqlalchemy.orm import Session
from app.models import Treatment, Doctor
from app.schema.treatment import TreatmentCreate, TreatmentUpdate

# CREATE
def create_treatment(db: Session, treatment_data: TreatmentCreate):
    treatment = Treatment(
        treatmentType=treatment_data.treatmentType,
        about=treatment_data.about,
        category=treatment_data.category,
        date=treatment_data.date,
        appointment_id=treatment_data.appointment_id,
        patient_id=treatment_data.patient_id
    )

    # Assign doctors (many-to-many)
    if treatment_data.doctor_ids:
        doctors = db.query(Doctor).filter(Doctor.id.in_(treatment_data.doctor_ids)).all()
        treatment.doctors.extend(doctors)

    db.add(treatment)
    db.commit()
    db.refresh(treatment)
    return treatment

# READ ALL
def get_all_treatments(db: Session):
    return db.query(Treatment).all()

# READ BY ID
def get_treatment_by_id(db: Session, treatment_id: int):
    return db.query(Treatment).filter(Treatment.id == treatment_id).first()

# UPDATE
def update_treatment(db: Session, treatment_id: int, update_data: TreatmentUpdate):
    treatment = get_treatment_by_id(db, treatment_id)
    if not treatment:
        return None

    for field, value in update_data.dict(exclude_unset=True).items():
        if field == "doctor_ids" and value is not None:
            treatment.doctors.clear()
            doctors = db.query(Doctor).filter(Doctor.id.in_(value)).all()
            treatment.doctors.extend(doctors)
        else:
            setattr(treatment, field, value)

    db.commit()
    db.refresh(treatment)
    return treatment

# DELETE
def delete_treatment(db: Session, treatment_id: int):
    treatment = get_treatment_by_id(db, treatment_id)
    if not treatment:
        return None
    db.delete(treatment)
    db.commit()
    return treatment
