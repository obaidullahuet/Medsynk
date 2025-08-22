from sqlalchemy.orm import Session

from app.schema import permission as PermissionSchema
from app.models import Permission





def createPermission(permissionData: PermissionSchema.permissionCreate, db: Session):
    try:
        newPermission=Permission(**permissionData.dict())
        db.add(newPermission)
        db.commit()
        db.refresh(newPermission)
        return {"data": newPermission}
    except Exception as e:
        db.rollback()
        print("Error creating Permission:", e)
        return {"error": str(e)}

def getPermissionById(roleId: int, db: Session):
    try:
        role = db.query(Permission).filter(Permission.id == roleId).first()
        if not role:
            return {"error": "Permission not found"}
        return {"data": role}
    except Exception as e:
        print("Error fetching Permission:", e)
        return {"error": str(e)}

def getAllPermissions(db: Session):
    try:
        roles = db.query(Permission).all()
        return {"data": roles}
    except Exception as e:
        print("Error fetching Permissions:", e)
        return {"error": str(e)}
    
def updatePermission(permissionId: int, permissionData: PermissionSchema.permissionUpdate, db: Session):
    try:
        permission = db.query(Permission).filter(Permission.id == permissionId).first()
        if not permission:
            return {"error": "permission not found"}
        
        # Update role attributes
        for key, value in permissionData.dict().items():
            setattr(permission, key, value)
        db.commit()
        db.refresh(permission)
        return {"data": permission}
    except Exception as e:
        db.rollback()
        print("Error updating permission:", e)
        return {"error": str(e)}


def deletePermission(roleId: int, db: Session):
    try:
        permission = db.query(Permission).filter(Permission.id == roleId).first()
        if not permission:
            return {"error": "permission not found"}
        
        db.delete(permission)
        db.commit()
        return {"data": "Role deleted successfully"}
    except Exception as e:
        db.rollback()
        print("Error deleting role:", e)
        return {"error": str(e)}