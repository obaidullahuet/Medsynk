from fastapi import APIRouter,Depends,HTTPException
from config.database import get_db
from sqlalchemy.orm import Session
from app.schema import role as RoleSchema 
from app.services import role as RoleService



router = APIRouter(tags=["Roles"])


# ====================== POST ============================
@router.post('/', description="Create a new Role")
def createRole(roleData:RoleSchema.RoleCreate,db:Session=Depends(get_db)):
    newRole=RoleService.createRole(roleData,db)
    if "error" in newRole:
        raise HTTPException(status_code=400, detail=newRole["error"])
    return {
        "message": "Role created successfully",
        "data": newRole["data"]
    }
    
# ====================== GET BY ID ============================

@router.get('/{id}', description="Get a Role by ID")
def getRoleById(id:int,db:Session=Depends(get_db)):
    role=RoleService.getRoleById(id,db)
    if "error" in role:
        raise HTTPException(status_code=404, detail=role["error"])
    return {
        "message": "Role retrieved successfully",
        "data": role["data"]
    }

# ======================  GET ===========================

@router.get('/',description="Get all Roles")
def getAllRoles(db:Session=Depends(get_db)):
    roles=RoleService.getAllRoles(db)
    if "error" in roles:
        raise HTTPException(status_code=500, detail=roles["error"])
    return {
        "message": "All roles retrieved successfully",
        "data": roles["data"]
    }
    
# ====================== UPDATE ============================
@router.put('/{id}')
def updateRole(id:int, roleData:RoleSchema.RoleCreate, db:Session=Depends(get_db)):
    updatedRole=RoleService.updateRole(id, roleData, db)
    if "error" in updatedRole:
        raise HTTPException(status_code=400, detail=updatedRole["error"])
    return {
        "message": "Role updated successfully",
        "data": updatedRole["data"]
    }

# ============== Update Role Permissions ================
@router.put("/permission/{id}")
def updateRolePermissions(id: int, permissions: RoleSchema.RolePermissionUpdate, db: Session = Depends(get_db)):
    updated = RoleService.updateRolePermission(id, permissions, db)
    if "error" in updated:
        raise HTTPException(status_code=400, detail=updated["error"])
    return {
        "message": "Role permissions updated successfully",
        "data": updated["data"]
    }
# ====================== DELETE ============================
@router.delete('/{id}')
def deleteRole(id:int, db:Session=Depends(get_db)):
    deleted=RoleService.deleteRole(id, db)
    if "error" in deleted:
        raise HTTPException(status_code=400, detail=deleted["error"])
    return {
        "message": "Role deleted successfully",
        # "data": deleted["data"]
    }