from typing import List
from fastapi import APIRouter, HTTPException
from sqlalchemy.orm import Session
from config.database import get_db
from fastapi import Depends

from app.schema import auth as UserSchema
from app.services import auth as UserService

router=APIRouter(tags=["Signup & Login"])


# ========================== POST ==================================
@router.post('/signup')
def addUser(data:UserSchema.CreateUser,db:Session=Depends(get_db)):
    newUser=UserService.createUser(data, db)

    if "error" in newUser:
        return {"message": "Error creating user", "error": newUser["error"]}
    
    return {
        "message": "User created successfully",
        "data": newUser["data"]
    }

@router.post('/login')
def login(data:UserSchema.Login, db:Session=Depends(get_db)):
    user=UserService.login(data, db)
    if "error" in user:
        return {"message": "Error during login", "error": user["error"]}
    return {
        "message": "User logged in successfully",
        "data": user["data"]
        ,"token":user["token"]
    }