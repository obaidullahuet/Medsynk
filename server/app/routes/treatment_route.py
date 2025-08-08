from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from config.database import get_db
from app.schema.treatment import TreatmentCreate, TreatmentUpdate, TreatmentOut
from app.services import treatment_service

router = APIRouter(prefix="/treatments", tags=["Treatments"])

@router.post("/", response_model=TreatmentOut)
def create_treatment(treatment: TreatmentCreate, db: Session = Depends(get_db)):
    return treatment_service.create_treatment(db, treatment)

@router.get("/", response_model=list[TreatmentOut])
def get_all_treatments(db: Session = Depends(get_db)):
    return treatment_service.get_all_treatments(db)

@router.get("/{treatment_id}", response_model=TreatmentOut)
def get_treatment_by_id(treatment_id: int, db: Session = Depends(get_db)):
    db_treatment = treatment_service.get_treatment_by_id(db, treatment_id)
    if not db_treatment:
        raise HTTPException(status_code=404, detail="Treatment not found")
    return db_treatment

@router.put("/{treatment_id}", response_model=TreatmentOut)
def update_treatment(treatment_id: int, update_data: TreatmentUpdate, db: Session = Depends(get_db)):
    updated_treatment = treatment_service.update_treatment(db, treatment_id, update_data)
    if not updated_treatment:
        raise HTTPException(status_code=404, detail="Treatment not found")
    return updated_treatment

@router.delete("/{treatment_id}")
def delete_treatment(treatment_id: int, db: Session = Depends(get_db)):
    deleted = treatment_service.delete_treatment(db, treatment_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Treatment not found")
    return {"message": "Treatment deleted successfully"}
