from pydantic import BaseModel
from typing import List, Optional

class Prescription(BaseModel):
    medicine: str
    dose: Optional[str] = ""
    generic_name: str

class LabTest(BaseModel):
    test: str
    cpt_code: Optional[str] = ""

class MedicalSummary(BaseModel):
    history: List[str]
    patient_condition: str
    symptoms: List[str]
    diagnosis: dict
    prescription: List[Prescription]
    lab_tests: List[LabTest]
    additional_advice: List[str]