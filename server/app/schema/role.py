from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class baseRole(BaseModel):
    
    name:str
    description:str
    createdAt:datetime
    
class RoleCreate(baseRole):
    pass

class RoleUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None

class RolePermissionUpdate(BaseModel):
    # roleId: Optional[int] = None
    permissionIds: list[int] = []
    
