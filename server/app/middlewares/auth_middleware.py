from fastapi import HTTPException, Request,FastAPI,status
from starlette.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware
import jwt
import os



app=FastAPI()


SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")

PUBLIC_PATHS=["/api/auth/login","/api/auth/signup","/auth/doctor/register","/auth/doctor/login","/docs","/openapi.json"]

async def jwt_middleware(request:Request,call_next):

    
    if request.url.path in PUBLIC_PATHS:
        return await call_next(request)
    authHeader=request.headers.get("Authorization")
    
    # print(authHeader)
    
    if not authHeader:
        return JSONResponse({"error": "Authorization header missing"}, status_code=401)
    
    token=authHeader.split(" ")[1]
    if not token:
        return JSONResponse({"error": "Token missing"}, status_code=401)
    try:
        
        payload=jwt.decode(token, SECRET_KEY, algorithms=ALGORITHM)
        
        print(payload)
        request.state.userId=payload["id"]
        request.state.userRole=payload["userRole"]
        request.state.userRoleId=payload["userRoleId"]
        request.state.permissions=payload["userPermissions"]
        request.state.email=payload["email"]
        
        print(request.state.permissions)
    # except jwt.ExpiredSignatureError:
    #     raise HTTPException(status_code=401, detail="Invalid Token")
    # except jwt.InvalidTokenError:
    #     raise HTTPException(status_code=401,detail="Invalid Token")
    except Exception as e:
        print(e)
        return JSONResponse({"error": "Invalid Auth Token"}, status_code=401)
    response=await call_next(request)
    return response






def requirePermission(permission: str):
    def wrapper(request: Request):
        # Ensure permissions exist in request.state (set in middleware)
        if not hasattr(request.state, "permissions") or request.state.permissions is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized")
        
        # print(request)
        if request.state.userRole=='admin':
            return True
        
        if permission not in request.state.permissions:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Forbidden: Missing '{permission}' permission"
            )
        return True
    return wrapper

