import json
from typing import Optional
from fastapi import APIRouter ,Depends,HTTPException, Form ,File,UploadFile
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from config.database import get_db
from app.services import doctor as DoctorService
from app.schema import doctor as DoctorSchema
from app.utils.file_handler import save_uploaded_file

router = APIRouter(prefix="/doctor", tags=["Doctor"])


@router.post('/')
def create_doctor( 
    name: str = Form(...),
    specialty: str = Form(...),
    contact: str = Form(...),
    email: str = Form(...),
    address: str = Form(...),
    experience: Optional[str] = Form(...), 
    about: Optional[str] = Form(None),
    available: Optional[bool] = Form(True),
    profilePhoto: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db)
):
    import json

    print("Raw experience:", experience)

    # Handle file upload
    profilePhotoPath = None
    if profilePhoto:
        profilePhotoPath = save_uploaded_file(profilePhoto)

    # Parse experience JSON string
    experience_dict = {}
    if experience:
        try:
            experience_dict = json.loads(experience)
        except json.JSONDecodeError:
            raise HTTPException(status_code=400, detail="'experience' must be valid JSON")

    # Create Pydantic model
    doctor = DoctorSchema.DoctorCreate(
        name=name,
        specialty=specialty,
        contact=contact,
        email=email,
        address=address,
        experience=experience_dict, 
        about=about,
        available=available,
        profilePhoto=profilePhotoPath
    )

    print("Doctor object:", doctor)

    # created_doctor = DoctorService.create_doctor(db, doctor)
    return {
        "message": "Doctor Created",
        # "data": created_doctor
    }



@router.get('/')
def get_doctor_list(skip:int=0,limit:int=10,db: Session = Depends(get_db)):
    doctor_list=DoctorService.get_doctor_list(skip,limit,db)
    return {
        "message":"Doctors List",
        "data":doctor_list
    }


@router.get("/{id}")
def get_doctor_by_id(id: int, db: Session = Depends(get_db)):
    doctor = DoctorService.get_doctor_by_id(id,db)
    if doctor is None:
        return JSONResponse(status_code=404, content={"message": f"Doctor with ID {id} not found"})
    return {
        "message": f"Doctor with ID {id} retrieved successfully",
        "data": doctor
    }

@router.put("/{id}")
def update_doctor(id: int, updated_data: DoctorSchema.DoctorUpdate, db: Session = Depends(get_db)):
        doctor = DoctorService.update_doctor(id, updated_data,db)
        return {
            "message": f"Doctor with ID {id} updated successfully",
            "data": doctor
        }
    
@router.delete("/{id}")
def delete_doctor(id: int, db: Session = Depends(get_db)):
        doctor = DoctorService.delete_doctor(id,db)
        return {
            "message": f"Doctor with ID {id} deleted successfully"
        }