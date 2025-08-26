from fastapi import FastAPI,Request
from fastapi.responses import JSONResponse
from config.database import Base, engine
from app.routes import router as app_router
from sqlalchemy.exc import IntegrityError
from app.utils.errorHandler import custom_http_exception_handler, handle_integrity_error,generic_exception_handler
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.openapi.utils import get_openapi
from fastapi.security import HTTPBearer

# from pyngrok import ngrok
import uvicorn
from fastapi import HTTPException

from app.middlewares import auth_middleware as middlewareService

UPLOAD_DIR = "uploads"


app = FastAPI(
    title="Hospital Management API",
    version="1.0.0"
)

bearer_scheme = HTTPBearer()

def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    openapi_schema = get_openapi(
        title="Medical API",
        version="1.0",
        description="API with token authentication",
        routes=app.routes,
    )
    openapi_schema["components"]["securitySchemes"] = {
        "BearerAuth": {"type": "http", "scheme": "bearer"}
    }
    for path in openapi_schema["paths"].values():
        for method in path.values():
            method["security"] = [{"BearerAuth": []}]
    app.openapi_schema = openapi_schema
    return app.openapi_schema

app.openapi = custom_openapi

app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")


# Creation of the Tables in the Database 
Base.metadata.create_all(bind=engine)




# Register Error Handler
app.add_exception_handler(IntegrityError, handle_integrity_error)
app.add_exception_handler(HTTPException, custom_http_exception_handler)
app.add_exception_handler(Exception, generic_exception_handler)

# Add CORS middleware first (before other middleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        # "http://localhost:5173",
        # "http://127.0.0.1:5173",
        # "http://localhost:5174",
        # "http://127.0.0.1:5174",
        # "http://localhost:3000",
        # "http://127.0.0.1:3000"
        '*'
    ], 
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH", "HEAD"], 
    allow_headers=["*"],
    expose_headers=["*"],
    max_age=86400,
)

# Register Routes
app.add_middleware(BaseHTTPMiddleware, dispatch=middlewareService.jwt_middleware)
app.include_router(app_router,prefix='/api')
