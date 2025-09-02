from pydantic import BaseModel,EmailStr
from typing import Optional
from datetime import datetime



class BaseUser(BaseModel):
    firstName: str
    lastName: str
    email: EmailStr
    password: str
    createdAt: Optional[datetime] = None

class CreateUser(BaseUser):
    pass


class UpdateUser(BaseModel):
    firstName: Optional[str] = None
    lastName: Optional[str] = None
    email: Optional[str] = None
    password: Optional[str] = None
    roleId: Optional[int] = None
    # isActive: Optional[bool] = None
    # isVerified: Optional[bool] = None
    # verificationToken: Optional[str] = None
    # passwordResetToken: Optional[str] = None
    # passwordResetExpires: Optional[datetime] = None
    # lastLogin: Optional[datetime] = None
    # updatedAt: Optional[datetime] = None
    # deletedAt: Optional[datetime] = None
    # deletedBy: Optional[int] = None
    # createdBy: Optional[int] = None
    # updatedBy: Optional[int] = None
    
class Login(BaseModel):
    email: str
    password: str