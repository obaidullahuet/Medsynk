from fastapi import APIRouter
from app.routes.patient import router as patient_router
from app.routes.doctor import router as doctor_router
from app.routes.appointment import router as appointment_router
from app.routes.reviews import router as reviews_router
from app.routes.medication import router as medication_router
from app.routes.treatment import router as treatment_router
from app.routes.patient_medical_info import router as patient_medical_info_router
from app.routes.patient_file import router as patient_file_router
from app.routes.doctor_availability import router as doctor_availability_router

router = APIRouter()

router.include_router(patient_router, prefix='/patient')
router.include_router(doctor_router,prefix='/doctor')
router.include_router(appointment_router)
router.include_router(patient_medical_info_router, prefix='/patient-medical-info')
router.include_router(patient_file_router, prefix='/patient-file')
# router.include_router(reviews_router)
# router.include_router(medication_router)
router.include_router(treatment_router)
router.include_router(doctor_availability_router, prefix='/doctor-availability')

