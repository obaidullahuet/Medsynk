from sqlalchemy.orm import Session

from app.schema import role as RoleSchema
from app.models import Role,Permission
from sqlalchemy.orm import joinedload





def createRole(roleData: RoleSchema.RoleCreate, db: Session):
    try:
        newRole=Role(**roleData.dict())
        db.add(newRole)
        db.commit()
        db.refresh(newRole)
        return {"data": newRole}
    except Exception as e:
        db.rollback()
        print("Error creating role:", e)
        return {"error": str(e)}

def getRoleById(roleId: int, db: Session):
    try:
        role = db.query(Role).options(joinedload(Role.permissions)).filter(Role.id == roleId).first()
        if not role:
            return {"error": "Role not found"}
        return {"data": role}
    except Exception as e:
        print("Error fetching role:", e)
        return {"error": str(e)}

def getAllRoles(db: Session):
    try:
        roles = db.query(Role).all()
        return {"data": roles}
    except Exception as e:
        print("Error fetching roles:", e)
        return {"error": str(e)}
    
def updateRole(roleId: int, roleData: RoleSchema.RoleUpdate, db: Session):
    try:
        role = db.query(Role).filter(Role.id == roleId).first()
        if not role:
            return {"error": "Role not found"}
        
        # Update role attributes
        for key, value in roleData.dict().items():
            setattr(role, key, value)
        db.commit()
        db.refresh(role)
        return {"data": role}
    except Exception as e:
        db.rollback()
        print("Error updating role:", e)
        return {"error": str(e)}


def deleteRole(roleId: int, db: Session):
    try:
        role = db.query(Role).filter(Role.id == roleId).first()
        if not role:
            return {"error": "Role not found"}
        
        db.delete(role)
        db.commit()
        return {"data": "Role deleted successfully"}
    except Exception as e:
        db.rollback()
        print("Error deleting role:", e)
        return {"error": str(e)}
    
    
def updateRolePermission(roleId:int,data:RoleSchema.RolePermissionUpdate,db:Session):
    try:
        role = db.query(Role).filter(Role.id == roleId).first()
        if not role:
            return {"error": "Role not found"}
        print(data)
        permissionObj=db.query(Permission).filter(Permission.id.in_(data.permissionIds)).all()
        if not permissionObj:
            print("Permissions not found")
            return {"error": "Permissions not found"}
        
        role.permissions = permissionObj
        db.commit()
        db.refresh(role)
        return {"data": role}
    except Exception as e:
        db.rollback()
        print("Error updating role permissions:", e)
        return {"error": str(e)}