import json
from typing import List, Optional, Union
from fastapi import APIRouter ,Depends,HTTPException, UploadFile,Form ,File,status
# from starlette.datastructures import UploadFile
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from config.database import get_db
from app.services import doctor as DoctorService
from app.schema import doctor as DoctorSchema
from app.utils.fileHandler import saveUploadedFile
from datetime import date

from app.middlewares.auth_middleware import requirePermission
from app.models import Treatment


router = APIRouter(tags=['Doctor'])


@router.post('/',status_code=status.HTTP_201_CREATED,dependencies=[Depends(requirePermission("doctor-create"))])
def createDoctor( 
    doctorData:DoctorSchema.DoctorCreate=Depends(DoctorSchema.doctorFormDependency),
    profilePhoto: UploadFile= File(None),
    db: Session = Depends(get_db)
):
    # Handle file upload
    profilePhotoPath = None
    print(type(profilePhoto))

    if type(profilePhoto) is not str and profilePhoto is not None:
        
         profilePhotoPath = saveUploadedFile(profilePhoto)

    doctorData.profilePhoto = profilePhotoPath
    
    print(doctorData)

    # if slotDuration is None or slotDuration==0:
    #     slotDuration = 15
    # Parse experience JSON string
    experienceDict = {}
    # if experience:
    #     print(experience)
    #     try:
    #         experienceDict = json.loads(experience)
    #     except json.JSONDecodeError:
    #         raise HTTPException(status_code=400, detail="'experience' must be valid JSON")
    # if treatmentIds:
    #     treatments = db.query(Treatment).filter(Treatment.id.in_(.doctorIds)).all()
    #     treatment.doctors.extend(doctors)
    # doctor = DoctorSchema.DoctorCreate(
    #     name=name,
    #     specialty=specialty,
    #     contact=contact,
    #     email=email,
    #     address=address,
    #     experience=experienceDict,
    #     about=about,
    #     slotDuration=slotDuration,
    #     available=available,
    #     treatmentIds=treatmentIds,
    #     profilePhoto=profilePhotoPath,
    #     createdAt=date.today()
    # )

    createdDoctor = DoctorService.createDoctor(db, doctorData)
    return {
        "message": "Doctor Created",
        "data": createdDoctor
    }



     

@router.get('/',dependencies=[Depends(requirePermission("doctor-view"))])
def getDoctorList(page:int=1,limit:int=10,db: Session = Depends(get_db)):
        
        resultData=DoctorService.getDoctorList(page,limit,db)
        return {"message":"Doctors List",**resultData}


@router.get("/{id}",dependencies=[Depends(requirePermission("doctor-view"))])
def getDoctorById(id: int, db: Session = Depends(get_db)):
    doctor = DoctorService.getDoctorById(id,db)
    if doctor is None:
        return JSONResponse(status_code=404, content={"message": f"Doctor not found"})
    return {
        "message": f"Doctor with ID {id} retrieved successfully",
        "data": doctor
    }

@router.put("/{id}",dependencies=[Depends(requirePermission("doctor-update"))])
def updateDoctor(
    id: int,
    updateData:DoctorSchema.DoctorUpdate=Depends(DoctorSchema.doctorUpdateFormDependency),
    profilePhoto:Union[UploadFile, None, str] = File(None),
    db: Session = Depends(get_db),
):
    profilePhotoPath = None
    if profilePhoto and  isinstance(profilePhoto,UploadFile):
        profilePhotoPath = saveUploadedFile(profilePhoto)
    updateData.profilePhoto = profilePhotoPath
    # experienceDict = None
    # if experience is not None:
    #     try:
    #         experienceDict = json.loads(experience)
    #     except json.JSONDecodeError:
    #         raise HTTPException(status_code=400, detail="'experience' must be valid JSON")
   
    # updateData = {
    #     "name": name,
    #     "specialty": specialty,
    #     "contact": contact,
    #     "email": email,
    #     "address": address,
    #     "experience": experienceDict,
    #     "about": about,
    #     "available": available,
    #     "profilePhoto": profilePhotoPath,
    #     "slotDuration": slotDuration,
    # }
    # updateData = {k: v for k, v in updateData.items() if v is not None}

    # doctorUpdate = DoctorSchema.DoctorUpdate(**updateData)

    updatedDoctor = DoctorService.update_doctor(id, updateData,db)
    if not updatedDoctor:
        raise HTTPException(status_code=404, detail="Doctor not found")

    return {
        "message": "Doctor updated successfully",
        "data": updatedDoctor,
    }
    
@router.delete("/{id}",dependencies=[Depends(requirePermission("doctor-delete"))])
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