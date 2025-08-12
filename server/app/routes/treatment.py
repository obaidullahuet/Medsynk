from fastapi import APIRouter, Depends, HTTPException,Form,UploadFile,File
from sqlalchemy.orm import Session
from config.database import get_db
from app.schema import treatment as TreatmentSchema
from app.services import treatment as TreatmentService
from app.utils.fileHandler import saveUploadedFile
import json


router = APIRouter(prefix="/treatment", tags=["Treatments"])

# @router.post("/",)
# def createTreatment(treatment: TreatmentSchema.TreatmentCreate, db: Session = Depends(get_db)):
#     newTreatemnt=TreatmentService.createTreatmentService(db, treatment)
#     return {
#         "message": "Treatment created successfully",
#         "data": newTreatemnt
#     }



@router.post("/")
def create_treatment(
    treatment: TreatmentSchema.TreatmentCreate = Depends(TreatmentSchema.treatmentFormDependency),
    image: UploadFile = File(None),
    db: Session = Depends(get_db)
):
    treatment.image = saveUploadedFile(image) if image else None
    new_treatment = TreatmentService.createTreatmentService(db, treatment)
    return {
        "message": "Treatment created successfully",
        "data": new_treatment
    }
#  response_model=TreatmentSchema.PaginatedTreatmentOut
@router.get("/",)
def getAllTreatments(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    allTreatment = TreatmentService.getAllTreatmentsService(skip, limit, db)
    if not allTreatment:
        raise HTTPException(status_code=404, detail="No Treatments found")
    return {
        "message": "All Treatments",
        **allTreatment
    }

@router.get("/{id}", )
def getTreatmentById(id: int, db: Session = Depends(get_db)):
    dbTreatment = TreatmentService.getTreatmentByIdService(db, id)
    if not dbTreatment:
        raise HTTPException(status_code=404, detail="Treatment not found")
    return dbTreatment

@router.put("/{id}")
def updateTreatment(id: int, update_data: TreatmentSchema.TreatmentUpdate=Depends(TreatmentSchema.updateTreatmentDependency), db: Session = Depends(get_db)):
    print(update_data)
    updated_treatment = TreatmentService.updateTreatmentService(db, id, update_data)
    if not updated_treatment:
        raise HTTPException(status_code=404, detail="Treatment not found")
    return {
        "message": "Treatment updated successfully",
        "data": updated_treatment
    }

@router.delete("/{id}")
def deleteTreatment(id: int, db: Session = Depends(get_db)):
    deleted = TreatmentService.deleteTreatmentService(db, id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Treatment not found")
    return {"message": "Treatment deleted successfully"}
