from typing import List
from fastapi import APIRouter, HTTPException
from sqlalchemy.orm import Session
from config.database import get_db
from fastapi import Depends

from app.schema import auth as UserSchema
from app.services import auth as UserService

router=APIRouter(tags=["Signup & Login"])


# ========================== POST ==================================
@router.post('/signup', summary="User Signup", description="Create a new user account")
def addUser(data:UserSchema.CreateUser,db:Session=Depends(get_db)):
    """Create a new user account with email and password"""
    newUser=UserService.createUser(data, db)

    if "error" in newUser:
        return {"message": "Error creating user", "error": newUser["error"]}
    
    return {
        "message": "User created successfully",
        "data": newUser["data"]
    }

@router.post('/login', summary="User Login", description="Authenticate user and get access token")  
def login(data:UserSchema.Login, db:Session=Depends(get_db)):
    """Authenticate user with email and password, returns access token"""
    user=UserService.login(data, db)
    if "error" in user:
        return {"message": "Error during login", "error": user["error"]}
    return {
        "message": "User logged in successfully",
        "data": user["data"]
        ,"token":user["token"]
    }