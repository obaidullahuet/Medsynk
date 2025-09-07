from sqlalchemy.orm import Session
from app.models import User,Role
from app.schema import auth as UserSchema
from sqlalchemy.orm import joinedload, load_only
from datetime import datetime, timedelta, timezone

from app.utils.passwordUtility import hashPassword,verifyPassword
import jwt
import os

SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-here")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES=os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 30)






def createUser(userData:UserSchema.CreateUser,db:Session):
    try:
        if userData.password.__len__() < 8:
            return {"error": "Password must be at least 8 characters long"}
        
        email = userData.email.lower()
        existing_user = db.query(User).filter(User.email == email).first()
        if existing_user:
            return {"error": "User with this email already exists"}
        
        
        # Role
        roleDetail=db.query(Role).filter(Role.name == 'admin').first()
        if roleDetail:
            roleId = roleDetail.id
        else:
            roleId = None
            
        newUser = User(**userData.dict())
        hashedPassword=hashPassword(userData.password)
        newUser.email=email
        newUser.password = hashedPassword
        newUser.roleId = roleId
        db.add(newUser)
        db.commit()
        db.refresh(newUser)
        print("New user created:", newUser)
        return {"data": newUser}
    
    except Exception as e:
        db.rollback()
        print("Error checking existing user:", e)
        return {"error": str(e)}
   

def login(userData:UserSchema.Login,db:Session):
    try:
        user = db.query(User).filter(User.email == userData.email).first()
        if not user:
            return {"error": "User not found"}
        
        if not verifyPassword(userData.password, user.password):
            return {"error": "Invalid password"}
        
        userObj = db.query(User).options(
            load_only(User.id, User.firstName, User.lastName, User.email, User.roleId, User.createdAt),
            joinedload(User.role).joinedload(Role.permissions)
        ).filter(User.id == user.id).first()
        if not userObj or not userObj.role:
            return {"error": "User role or permissions not found"}
        userPermission = userObj.role.permissions
        userPermissions = [permission.name for permission in userPermission] if userPermission else []

        expire_minutes = int(ACCESS_TOKEN_EXPIRE_MINUTES)
        current_time = datetime.now(timezone.utc)
        expiration_time = current_time + timedelta(minutes=expire_minutes)

        payload = {
            "userRole": userObj.role.name,
            "userRoleId": userObj.roleId,
            "userPermissions": userPermissions,
            "id": userObj.id,
            "email": userObj.email,
            "firstName": userObj.firstName,
            "lastName": userObj.lastName,
            "exp": expiration_time
        }

        jwtToken = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
        return {"data": userObj, "token": jwtToken}
    
    except Exception as e:
        print("Error during login:", e)
        return {"error": str(e)}