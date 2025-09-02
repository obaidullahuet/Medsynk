from sqlalchemy import Column, Integer, String, Date, DateTime, Table, Text, ForeignKey, Boolean, JSON, DECIMAL, Time
from sqlalchemy.orm import relationship
from config.database import Base
from datetime import datetime
import enum 
from sqlalchemy import Enum
from sqlalchemy.dialects.postgresql import JSONB




# ============== User ====================
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    firstName=Column(String(100))
    lastName=Column(String(100))
    email = Column(String(100), unique=True)
    password = Column(String(255))
    roleId=Column(Integer,ForeignKey("roles.id",ondelete='CASCADE'),nullable=True)
    
    createdAt = Column(Date, default=datetime.utcnow) 
    
    role=relationship("Role",back_populates='users') 

    

role_permission = Table(
    "role_permission_junction",
    Base.metadata,
    Column("roleId", Integer, ForeignKey("roles.id"), primary_key=True),
    Column("permissionId", Integer, ForeignKey("permissions.id"), primary_key=True)
)    
  
class Role(Base):
    __tablename__="roles"
    
    id=Column(Integer, primary_key=True, index=True)
    name=Column(String(100),unique=True)
    description=Column(String(100),nullable=True)
    createdAt = Column(Date, default=datetime.utcnow)
    
    users=relationship("User",back_populates='role')
    permissions=relationship("Permission",secondary=role_permission,back_populates='roles')
    
    
    
class Permission(Base):
    __tablename__="permissions"
    
    id=Column(Integer,primary_key=True,index=True)
    name=Column(String(100),unique=True)
    description=Column(String(100),nullable=True)
    
    
    roles=relationship("Role",secondary=role_permission,back_populates="permissions")
    
  
  
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


    appointments = relationship("Appointment", back_populates="doctor", cascade="all, delete-orphan")
    availability = relationship("DoctorAvailability", back_populates="doctor", cascade="all, delete-orphan")
    treatments = relationship("Treatment", secondary=treatment_doctor, back_populates="doctors")

# ============= Doctor Availability ========
class DoctorAvailability(Base):
    __tablename__ = "doctor_availability"

    id = Column(Integer, primary_key=True, index=True)
    doctorId = Column(Integer, ForeignKey("doctors.id",ondelete='CASCADE'),nullable=False)
    day=Column(String(10))    
    startTime = Column(Time)
    endTime=Column(Time)
    createdAt = Column(Date)

    doctor = relationship("Doctor", back_populates="availability", passive_deletes=True)




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

    files = relationship("PatientFile", back_populates="patient", cascade="all, delete-orphan")
    medicalInfo = relationship("PatientMedicalInfo", back_populates="patient", cascade="all, delete-orphan")
    appointments = relationship("Appointment", back_populates="patient", cascade="all, delete-orphan")


class PatientMedicalInfo(Base):
    __tablename__ = "patient_medical_info"

    id=Column(Integer, primary_key=True, index=True)
    patientId = Column(Integer, ForeignKey("patients.id",ondelete='CASCADE'),nullable=True)
    bloodGroup = Column(String(10),nullable=True)
    bodyTemperature = Column(String(10),nullable=True)
    heartRate = Column(String(10),nullable=True)
    respirationRate = Column(String(10),nullable=True)
    bloodPressure = Column(String(10),nullable=True)
    icdCode=Column(String(10),nullable=True)
    cptCode=Column(String(10), nullable=True)
    notes=Column(JSONB, nullable=True)
    createdAt=Column(Date)

    appointmentId=Column(Integer, ForeignKey("appointments.id",ondelete='CASCADE'),nullable=True )

    patient = relationship("Patient", back_populates="medicalInfo", passive_deletes=True)
    appointment = relationship("Appointment", back_populates="medicalInfo", passive_deletes=True)

# ============ Patient Files ==============
class PatientFile(Base):
    __tablename__ = "patient_files"

    id=Column(Integer,primary_key=True,index=True)
    fileName = Column(String(100))
    fileUrl = Column(String(255))
    patientId = Column(Integer, ForeignKey("patients.id",ondelete='CASCADE'),nullable=False)
    # Appt_id
    createdAt=Column(Date)
    
    patient = relationship("Patient", back_populates="files", passive_deletes=True)



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
    doctorId = Column(Integer, ForeignKey("doctors.id",ondelete='CASCADE'),nullable=False)
    patientId = Column(Integer, ForeignKey("patients.id",ondelete='CASCADE'),nullable=False)
    treatmentId=Column(Integer, ForeignKey("treatments.id",ondelete='CASCADE'),nullable=False)

    doctor = relationship("Doctor", back_populates="appointments", passive_deletes=True)
    patient = relationship("Patient", back_populates="appointments", passive_deletes=True)
    treatment = relationship("Treatment", back_populates="appointments", passive_deletes=True)
    medicalInfo = relationship("PatientMedicalInfo", back_populates="appointment", cascade="all, delete-orphan")

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

    doctors = relationship("Doctor", secondary=treatment_doctor, back_populates="treatments")
    appointments = relationship("Appointment", back_populates="treatment", cascade="all, delete-orphan")



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
