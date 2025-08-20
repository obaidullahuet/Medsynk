from fastapi import APIRouter,Depends,HTTPException
from config.database import get_db
from sqlalchemy.orm import Session
from app.schema import permission as PermissionSchema 
from app.services import permission as PermissionService



router = APIRouter(tags=["permissions"])


# ====================== POST ============================
@router.post('/', description="Create a new Permission")
def createPermission(permissionData:PermissionSchema.permissionCreate,db:Session=Depends(get_db)):
    newPermission=PermissionService.createPermission(permissionData,db)
    if "error" in newPermission:
        raise HTTPException(status_code=400, detail=newPermission["error"])
    return {
        "message": "Permission created successfully",
        "data": newPermission["data"]
    }
    
# ====================== GET BY ID ============================

@router.get('/{id}', description="Get a Permission by ID")
def getPermissionById(id:int,db:Session=Depends(get_db)):
    permission=PermissionService.getPermissionById(id,db)
    if "error" in permission:
        raise HTTPException(status_code=404, detail=permission["error"])
    return {
        "message": "Permission retrieved successfully",
        "data": permission["data"]
    }

# ======================  GET ===========================

@router.get('/',description="Get all Permissions")
def getAllPermissions(db:Session=Depends(get_db)):
    permissions=PermissionService.getAllPermission(db)
    if "error" in permissions:
        raise HTTPException(status_code=500, detail=permissions["error"])
    return {
        "message": "All permissions retrieved successfully",
        "data": permissions["data"]
    }
    
# ====================== UPDATE ============================
@router.put('/{id}')
def updatePermission(id:int, permissionData:PermissionSchema.permissionUpdate, db:Session=Depends(get_db)):
    updatePermission=PermissionService.updatePermission(id, permissionData, db)
    if "error" in updatePermission:
        raise HTTPException(status_code=400, detail=updatePermission["error"])
    return {
        "message": "permission updated successfully",
        "data": updatePermission["data"]
    }
# ====================== DELETE ============================
@router.delete('/{id}')
def deletePermission(id:int, db:Session=Depends(get_db)):
    deleted=PermissionService.deletePermission(id, db)
    if "error" in deleted:
        raise HTTPException(status_code=400, detail=deleted["error"])
    return {
        "message": "permission deleted successfully",
        # "data": deleted["data"]
    }