from fastapi import Request,FastAPI
from starlette.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware
import jwt




app=FastAPI()

SECRET_KEY="your_secret_key"
ALGORITHM="HS256"
PUBLIC_PATHS=["/auth/login","/auth/register","/auth/doctor/register","/auth/doctor/login"]

async def jwt_middleware(request:Request,call_next):

    
    if request.url.path in PUBLIC_PATHS:
        return await call_next(request)
    authHeader=request.headers.get("Authorization")
    if not authHeader:
        return JSONResponse({"error": "Authorization header missing"}, status_code=401)
    
    token=authHeader.split(" ")[1]
    if not token:
        return JSONResponse({"error": "Token missing"}, status_code=401)
    try:
        payload=jwt.decode(token, SECRET_KEY, algorithms=ALGORITHM)
        request.state.user_id=payload["user_id"]
    except jwt.ExpiredSignatureError:
        return JSONResponse({"error": "Token expired"}, status_code=401)
    
    response=await call_next(request)
    return response


