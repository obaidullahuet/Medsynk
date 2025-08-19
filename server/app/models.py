from sqlalchemy import Column, Integer, String, Date, DateTime, Table, Text, ForeignKey, Boolean, JSON, DECIMAL, Time
from sqlalchemy.orm import relationship
from config.database import Base
from datetime import datetime
import enum 
from sqlalchemy import Enum



# ============== User ====================
# class UserType(enum.Enum):
#     doctor = "doctor"
#     patient = "patient"
#     admin = "admin"
# class User(Base):
#     __tablename__ = "users"

#     id = Column(Integer, primary_key=True, index=True)
#     firstName=Column(String(100))
#     lastName=Column(String(100))
#     email = Column(String(100), unique=True)
#     passwordHash = Column(String(255))
#     userType = Column(Enum(UserType), default=UserType.patient)  # Enum for user type
#     createdAt = Column(Date, default=datetime.utcnow)



# ========== DOCTOR ==========

treatment_doctor=Table(
    "doctor_treatment_junction",
    Base.metadata,
    Column("doctorId", Integer, ForeignKey("doctors.id"), primary_key=True),
    Column("treatmentId", Integer, ForeignKey("treatments.id"), primary_key=True)
)

class Doctor(Base):
    __tablename__ = "doctors"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    about = Column(Text, nullable=True)
    contact = Column(String(15))
    email = Column(String(100), unique=True)
    address = Column(Text)
    experience = Column(JSON,nullable=True)
    specialty = Column(String(100),nullable=True)
    profilePhoto = Column(String, nullable=True)
    available = Column(Boolean, default=True) 
    slotDuration = Column(Integer, default=15)
    createdAt=Column(Date)


    # availability=relationship("DoctorAvailability", backref="doctor")
    # appointments = relationship("Appointment", back_populates="doctor")
    treatments = relationship("Treatment", secondary=treatment_doctor, back_populates="doctors")

# ============= Doctor Availability ========
class DoctorAvailability(Base):
    __tablename__ = "doctor_availability"

    id = Column(Integer, primary_key=True, index=True)
    doctorId = Column(Integer, ForeignKey("doctors.id",ondelete='CASCADE'),nullable=True)
    day=Column(String(10))    
    startTime = Column(Time)
    endTime=Column(Time)
    createdAt = Column(Date)

    doctor=relationship("Doctor", backref="availability")




# ========== PATIENT ==========

class gender(enum.Enum):
    male="male"
    female="female"
    other="other"

class Patient(Base):
    __tablename__ = "patients"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    age = Column(Integer)
    dob = Column(Date)
    gender = Column(Enum(gender),default=gender.male) #enum
    emergencyContact = Column(String(15),nullable=True)
    email = Column(String(100), unique=True)
    phone = Column(String(15))
    about = Column(Text, nullable=True)
    address = Column(Text,nullable=True)
    image=Column(String, nullable=True)
    createdAt=Column(Date)

    files=relationship("PatientFile", backref="patient")
    # appointments=relationship("Appointment", back_populates="patient")
    medicalInfo=relationship("PatientMedicalInfo", backref="patient")


class PatientMedicalInfo(Base):
    __tablename__ = "patient_medical_info"

    id=Column(Integer, primary_key=True, index=True)
    patientId = Column(Integer, ForeignKey("patients.id",ondelete='CASCADE'),nullable=True)
    bloodGroup = Column(String(5),nullable=True)
    bodyTemperature = Column(String,nullable=True)
    heartRate = Column(String,nullable=True)
    respirationRate = Column(String,nullable=True)
    bloodPressure = Column(String,nullable=True)
    icdCode=Column(String,nullable=True)
    cptCode=Column(String, nullable=True)
    notes=Column(Text, nullable=True)
    createdAt=Column(Date)

    appointmentId=Column(Integer, ForeignKey("appointments.id",ondelete='CASCADE'),nullable=True )

    appointment=relationship("Appointment", backref="medicalInfo")

# ============ Patient Files ==============
class PatientFile(Base):
    __tablename__ = "patient_files"

    id=Column(Integer,primary_key=True,index=True)
    fileName = Column(String(100))
    fileUrl = Column(String(255))
    patientId = Column(Integer, ForeignKey("patients.id"))
    # Appt_id
    createdAt=Column(Date)


# ========== APPOINTMENT ==========
class AppointmentStatus(enum.Enum):
    pending="pending"
    completed="completed"
    scheduled="scheduled"
    cancelled="cancelled"
    rescheduled="rescheduled"
    inProgress="in_progress"


class Appointment(Base):
    __tablename__ = "appointments"

    id = Column(Integer, primary_key=True, index=True)
    scheduledDate = Column(Date)
    scheduledTime=Column(Time)
    status = Column(Enum(AppointmentStatus), default=AppointmentStatus.pending)
    doctorId = Column(Integer, ForeignKey("doctors.id"))
    patientId = Column(Integer, ForeignKey("patients.id"))
    treatmentId=Column(Integer, ForeignKey("treatments.id"))

    doctor = relationship("Doctor", backref="appointments")
    patient = relationship("Patient",backref="appointments")
    treatment = relationship("Treatment", backref="appointments")

# ========== TREATMENT ==========


class TreatmentType(enum.Enum):
    surgical="surgical"
    non_surgical="non_surgical"
    other="other"


class Treatment(Base):
    __tablename__ = "treatments"

    id = Column(Integer, primary_key=True)
    name=Column(String(100))
    price=Column(Integer,nullable=True)
    image=Column(String,nullable=True)
    treatmentType = Column(Enum(TreatmentType),default=TreatmentType.surgical)
    about=Column(Text, nullable=True)
    description = Column(Text, nullable=True)
    createdAt = Column(Date)

    doctors=relationship("Doctor",secondary=treatment_doctor,back_populates="treatments")



# ========== SURGERY PERFORMED ==========
class SurgeryPerformed(Base):
    __tablename__ = "surgeries_performed"

    id = Column(Integer, primary_key=True)
    surgeryType = Column(String(100))
    performedAt = Column(DateTime)
    room = Column(String(50))
    notes = Column(Text, nullable=True)

    doctor_id = Column(Integer, ForeignKey("doctors.id"))
    patient_id = Column(Integer, ForeignKey("patients.id"))

# ========== SURGERY SCHEDULE ==========
class SurgerySchedule(Base):
    __tablename__ = "surgery_schedules"

    id = Column(Integer, primary_key=True)
    surgeryType = Column(String(100))
    scheduledAt = Column(DateTime)
    room = Column(String(50))

    doctor_id = Column(Integer, ForeignKey("doctors.id"))


# ========== REVIEW ==========
class Review(Base):
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True)
    rating = Column(Integer)
    comment = Column(Text, nullable=True)

    doctor_id = Column(Integer, ForeignKey("doctors.id"))
    treatment_id = Column(Integer, ForeignKey("treatments.id"))
    patient_id = Column(Integer, ForeignKey("patients.id"))

    createdAt = Column(DateTime, default=datetime.utcnow)

# ========== PAYMENT ==========
# class Payment(Base):
#     __tablename__ = "payments"

#     id = Column(Integer, primary_key=True)
#     amount = Column(DECIMAL(10, 2))
#     paidAt = Column(DateTime)
#     method = Column(String(50))
#     status = Column(String(50))

#     patient_id = Column(Integer, ForeignKey("patients.id"))
#     treatment_id = Column(Integer, ForeignKey("treatments.id"), nullable=True)

# ========== MESSAGE ==========
# class Message(Base):
#     __tablename__ = "messages"

#     id = Column(Integer, primary_key=True)
#     content = Column(Text)
#     sentAt = Column(DateTime, default=datetime.utcnow)
#     status = Column(String(50))
#     senderType = Column(String(20))
#     senderId = Column(Integer)
#     receiverType = Column(String(20))
#     receiverId = Column(Integer)

# ========== ADMIN USER ==========
# class AdminUser(Base):
#     __tablename__ = "admin_users"

#     id = Column(Integer, primary_key=True)
#     name = Column(String(100))
#     email = Column(String(100), unique=True)
#     role = Column(String(50))
#     passwordHash = Column(String(255))

# ========== MEDICATION ==========
class Medication(Base):
    __tablename__ = "medications"

    id = Column(Integer, primary_key=True)
    name = Column(String(100))
    dosage = Column(String(50))
    alergy = Column(JSON)
    frequency = Column(String(50))
    prescribedAt = Column(DateTime)

    patient_id = Column(Integer, ForeignKey("patients.id"))
    doctor_id = Column(Integer, ForeignKey("doctors.id"))

# ========== HEALTH REPORT ==========
class HealthReport(Base):
    __tablename__ = "health_reports"

    id = Column(Integer, primary_key=True)
    reportType = Column(String(100))
    description = Column(Text, nullable=True)
    filePath = Column(String)
    uploadedAt = Column(DateTime, default=datetime.utcnow)

    patient_id = Column(Integer, ForeignKey("patients.id"))
    doctor_id = Column(Integer, ForeignKey("doctors.id"))

# ========== VITAL STATS ==========
# class VitalStat(Base):
#     __tablename__ = "vital_stats"

#     id = Column(Integer, primary_key=True)
#     temperature = Column(Integer)
#     heart_rate = Column(Integer)
#     blood_pressure_systolic = Column(Integer)
#     blood_pressure_diastolic = Column(Integer)
#     respiratory_rate = Column(Integer)
#     recorded_at = Column(DateTime, default=datetime.utcnow)

#     patient_id = Column(Integer, ForeignKey("patients.id"))
#     doctor_id = Column(Integer, ForeignKey("doctors.id"), nullable=True)
#     appointment_id = Column(Integer, ForeignKey("appointments.id"), nullable=True)

#     patient = relationship("Patient", backref="vital_stats")
