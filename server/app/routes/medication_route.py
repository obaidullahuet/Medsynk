from fastapi import APIRouter ,Depends
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from config.database import get_db
from app.services import medication_service as MedicationService
from app.schema import medication_schema as MedicationSchema



# router = APIRouter()
router = APIRouter(prefix="/medication", tags=["Medication"])


@router.post('/')
def create_medication(doctor: MedicationSchema.MedicationCreate, db: Session = Depends(get_db)):
    new_medication=MedicationService.create_medication(doctor,db)
    return {
        "message": "Medication Created",
        "data": new_medication
    }


@router.get('/')
def get_medication_list(skip:int=0,limit:int=10,db: Session = Depends(get_db)):
    medication_list=MedicationService.get_medication_list(skip,limit,db)
    return {
        "message":"Medication List",
        "data":medication_list
    }

@router.get("/{id}")
def get_medication_by_id(id: int,db:Session=Depends(get_db)):
   medicationDetail=MedicationService.get_medication_by_id(id,db)
   if not medicationDetail:
      return JSONResponse(status_code=404, content={"message": "Medication not found"})
   return {
      "message":"Medication Detail",
      "data":medicationDetail
   }
   


@router.put("/{id}")
def update_medication(id: int,medication:MedicationSchema.MedicationUpdate,db:Session=Depends(get_db)):
    updated_medication=MedicationService.update_medication(id,medication, db)
    return {
            "message": f"Medication with ID {id} updated successfully",
            "data": updated_medication
        }

@router.delete("/{id}")
def delete_medication(id: int, db:Session=Depends(get_db)):
    deleted_medication=MedicationService.delete_medication(id, db)
    if not deleted_medication:
        return JSONResponse(status_code=404, content={"message": "Medication not found"})
    return {
        "message": f"Medication with ID {id} deleted successfully"
    }

