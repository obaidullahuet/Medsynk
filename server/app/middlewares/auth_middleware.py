from fastapi import HTTPException, Request,FastAPI,status
from starlette.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware
import jwt
import os




app=FastAPI()


SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-here")
ALGORITHM = os.getenv("ALGORITHM", "HS256")

PUBLIC_PATHS=["/api/auth/login","/api/auth/signup","/auth/doctor/register","/auth/doctor/login","/docs","/openapi.json","/"]

async def jwt_middleware(request:Request,call_next):

    # Handle OPTIONS requests for CORS preflight
    if request.method == "OPTIONS":
        print('OPTIONS REQUEST PASSED')
        return await call_next(request)
    
    # Check if the path is in public paths or starts with /uploads/
    if request.url.path in PUBLIC_PATHS or request.url.path.startswith('/uploads/'):
        return await call_next(request)
    authHeader=request.headers.get("Authorization")
    # print(authHeader)
    
    # print(f"🔍 Auth header: '{authHeader}'")
    
    if not authHeader:
        return JSONResponse({"error": "Authorization header missing"}, status_code=401)
    
    # Ensure the header is in "Bearer <token>" format
    parts = authHeader.split(" ")
    if len(parts) != 2 or parts[0].lower() != "bearer":
        return JSONResponse({"error": "Authorization header must be in 'Bearer <token>' format"}, status_code=401)
    
    token = parts[1]
    if not token:
        return JSONResponse({"error": "Token missing"}, status_code=401)
    try:
        
        payload=jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        
        print(payload)
        request.state.userId=payload["id"]
        request.state.userRole=payload["userRole"]
        request.state.userRoleId=payload["userRoleId"]
        request.state.permissions=payload["userPermissions"]
        request.state.email=payload["email"]
        
        print(request.state.permissions)
    except jwt.ExpiredSignatureError:
        print("JWT token has expired")
        return JSONResponse({"error": "Token has expired"}, status_code=401)
        # return HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token has expired")
    except jwt.InvalidTokenError:
        print("Invalid JWT token")
        return JSONResponse({"error": "Invalid token"}, status_code=401)
    except Exception as e:
        print(f"JWT decode error: {e}")
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

