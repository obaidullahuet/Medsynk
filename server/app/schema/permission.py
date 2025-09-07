from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class basePermission(BaseModel):
    
    name:str
    description:str
    # createdAt:datetime
    
class permissionCreate(basePermission):
    pass

class permissionUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None