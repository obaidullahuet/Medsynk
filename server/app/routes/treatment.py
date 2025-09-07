from typing import Optional, Union
from fastapi import APIRouter, Depends, HTTPException,Form,UploadFile,File
from sqlalchemy.orm import Session
from config.database import get_db
from app.schema import treatment as TreatmentSchema
from app.services import treatment as TreatmentService
from app.utils.fileHandler import saveUploadedFile
import json

from app.middlewares.auth_middleware import requirePermission


router = APIRouter(prefix="/treatment", tags=["Treatments"])

@router.post("/",dependencies=[Depends(requirePermission("treatment-create"))])
def create_treatment(
    treatment: TreatmentSchema.TreatmentCreate = Depends(TreatmentSchema.treatmentFormDependency),
    # image:Optional[UploadFile] = File(None),
    image: Union[UploadFile, None, str] = File(None),
    db: Session = Depends(get_db)
):
    # print(treatment,image)

    if image and isinstance(image, UploadFile):
       treatment.image = saveUploadedFile(image)
    else:
       treatment.image = None

    new_treatment = TreatmentService.createTreatmentService(db, treatment)
    return {
        "message": "Treatment created successfully",
        "data": new_treatment
    }
#  response_model=TreatmentSchema.PaginatedTreatmentOut

@router.get("/",dependencies=[Depends(requirePermission("treatment-view"))])
def getAllTreatments(page: int = 1, limit: int = 10,search:str=None,filter:str=None, db: Session = Depends(get_db)):
    allTreatment = TreatmentService.getAllTreatmentsService(page, limit,search,filter, db)
    if not allTreatment:
        raise HTTPException(status_code=404, detail="No Treatments found")
    return {
        "message": "All Treatments",
        **allTreatment
    }

@router.get("/{id}",dependencies=[Depends(requirePermission("treatment-view"))])
def getTreatmentById(id: int, db: Session = Depends(get_db)):
    dbTreatment = TreatmentService.getTreatmentByIdService(db, id)
    if not dbTreatment:
        raise HTTPException(status_code=404, detail="Treatment not found")
    return dbTreatment

@router.put("/{id}",dependencies=[Depends(requirePermission("treatment-update"))])
def updateTreatment(id: int, update_data: TreatmentSchema.TreatmentUpdate=Depends(TreatmentSchema.updateTreatmentDependency),    image: UploadFile = File(None), db: Session = Depends(get_db)):
    print(update_data)
    if image:
        update_data.image = saveUploadedFile(image)
        
    updated_treatment = TreatmentService.updateTreatmentService(db, id, update_data)
    if not updated_treatment:
        raise HTTPException(status_code=404, detail="Treatment not found")
    return {
        "message": "Treatment updated successfully",
        "data": updated_treatment
    }

@router.delete("/{id}",dependencies=[Depends(requirePermission("treatment-delete"))])
def deleteTreatment(id: int, db: Session = Depends(get_db)):
    deleted = TreatmentService.deleteTreatmentService(db, id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Treatment not found")
    return {"message": "Treatment deleted successfully"}


#  ============ Get the Doctors List against a Treatment ===============
@router.get("/doctors/{id}")
def getDoctorsByTreatmentId(id: int, db: Session = Depends(get_db)):
    doctors = TreatmentService.getDoctorsByTreatmentIdService(id, db)
    if not doctors:
        raise HTTPException(status_code=404, detail="Doctors not found")
    return {
        "message": "Doctors List",
        "data": doctors
    }