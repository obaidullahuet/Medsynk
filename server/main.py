from fastapi import FastAPI,Request
from fastapi.responses import JSONResponse
from config.database import Base, engine
from app.routes import router as app_router
from sqlalchemy.exc import IntegrityError
from app.utils.errorHandler import custom_http_exception_handler, handle_integrity_error,generic_exception_handler
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
from fastapi.staticfiles import StaticFiles
# from pyngrok import ngrok
import uvicorn
from fastapi import HTTPException

from app.middlewares import auth_middleware as middlewareService

UPLOAD_DIR = "uploads"


app = FastAPI(
    title="Hospital Management API",
    version="1.0.0"
)

# publicUrl=ngrok.connect(8000)
# print(f"Public URL: {publicUrl}")

app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")


# Creation of the Tables in the Database 
Base.metadata.create_all(bind=engine)

# Register Error Handler
app.add_exception_handler(IntegrityError, handle_integrity_error)
app.add_exception_handler(Exception, generic_exception_handler)
app.add_exception_handler(HTTPException, custom_http_exception_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],          
    allow_credentials=True,
    allow_methods=["*"],             
    allow_headers=["*"],             
    )

# Register Routes
app.add_middleware(BaseHTTPMiddleware, dispatch=middlewareService.jwt_middleware)
app.include_router(app_router,prefix='/api')
# uvicorn.run("main:app", host="0.0.0.0", port=8000)

