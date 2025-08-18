import json
from typing import Optional
from fastapi import APIRouter ,Depends,HTTPException, Form ,File,UploadFile,status
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from config.database import get_db
from app.services import doctor as DoctorService
from app.schema import doctor as DoctorSchema
from app.utils.fileHandler import saveUploadedFile
from datetime import date


router = APIRouter(tags=['Doctor'])


@router.post('/',status_code=status.HTTP_201_CREATED)
def createDoctor( 
    name: str = Form(...),
    specialty: str = Form(...),
    contact: str = Form(...),
    email: str = Form(...),
    address: str = Form(...),
    experience: Optional[str] = Form(...), 
    about: Optional[str] = Form(None),
    available: Optional[bool] = Form(True),
    slotDuration: Optional[int] = Form(None),
    profilePhoto: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db)
):
    # Handle file upload
    print(profilePhoto)
    profilePhotoPath = None
    if profilePhoto and profilePhoto!='':
        profilePhotoPath = saveUploadedFile(profilePhoto)
    if slotDuration is None or slotDuration==0:
        slotDuration = 15
    # Parse experience JSON string
    experienceDict = {}
    if experience:
        print(experience)
        try:
            experienceDict = json.loads(experience)
        except json.JSONDecodeError:
            raise HTTPException(status_code=400, detail="'experience' must be valid JSON")

    doctor = DoctorSchema.DoctorCreate(
        name=name,
        specialty=specialty,
        contact=contact,
        email=email,
        address=address,
        experience=experienceDict,
        about=about,
        slotDuration=slotDuration,
        available=available,
        profilePhoto=profilePhotoPath,
        createdAt=date.today()
    )

    createdDoctor = DoctorService.createDoctor(db, doctor)
    return {
        "message": "Doctor Created",
        "data": createdDoctor
    }



     

@router.get('/')
def getDoctorList(skip:int=0,limit:int=10,db: Session = Depends(get_db)):
        
        resultData=DoctorService.getDoctorList(skip,limit,db)
        return {"message":"Doctors List",**resultData}


@router.get("/{id}")
def getDoctorById(id: int, db: Session = Depends(get_db)):
    doctor = DoctorService.getDoctorById(id,db)
    if doctor is None:
        return JSONResponse(status_code=404, content={"message": f"Doctor not found"})
    return {
        "message": f"Doctor with ID {id} retrieved successfully",
        "data": doctor
    }

@router.put("/{id}")
def updateDoctor(
    id: int,
    name: Optional[str] = Form(None),
    specialty: Optional[str] = Form(None),
    contact: Optional[str] = Form(None),
    email: Optional[str] = Form(None),
    address: Optional[str] = Form(None),
    experience: Optional[str] = Form(None),
    about: Optional[str] = Form(None),
    slotDuration: Optional[int] = Form(None),
    available: Optional[bool] = Form(None),
    profilePhoto: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
):
    profilePhotoPath = None
    if profilePhoto and  isinstance(profilePhoto,UploadFile):
        profilePhotoPath = saveUploadedFile(profilePhoto)

    experienceDict = None
    if experience is not None:
        try:
            experienceDict = json.loads(experience)
        except json.JSONDecodeError:
            raise HTTPException(status_code=400, detail="'experience' must be valid JSON")
   
    updateData = {
        "name": name,
        "specialty": specialty,
        "contact": contact,
        "email": email,
        "address": address,
        "experience": experienceDict,
        "about": about,
        "available": available,
        "profilePhoto": profilePhotoPath,
        "slotDuration": slotDuration,
    }
    updateData = {k: v for k, v in updateData.items() if v is not None}

    doctorUpdate = DoctorSchema.DoctorUpdate(**updateData)

    updatedDoctor = DoctorService.update_doctor(id, doctorUpdate,db)
    if not updatedDoctor:
        raise HTTPException(status_code=404, detail="Doctor not found")

    return {
        "message": "Doctor updated successfully",
        "data": updatedDoctor,
    }
    
@router.delete("/{id}")
def deleteDoctor(id: int, db: Session = Depends(get_db)):
        doctor = DoctorService.deleteDoctor(id,db)
        return {
            "message": f"Doctor deleted successfully"
        }


# @router.put("/image/{id}")
# def update_doctor_image(id: int, profilePhoto: UploadFile = File(...), db: Session = Depends(get_db)):
    
#     profilePhotoPath = save_uploaded_file(profilePhoto)
#     doctor = DoctorService.update_doctor_image(id, profilePhotoPath, db)
#     return {
#         "message": f"Doctor with ID {id} updated successfully",
#         "data": doctor
#     }