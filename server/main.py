from fastapi import FastAPI,Request
from fastapi.responses import JSONResponse
from config.database import Base, engine
from app.routes import router as app_router
from sqlalchemy.exc import IntegrityError
from app.utils.errorHandler import handle_integrity_error,generic_exception_handler
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(
    title="Hospital Management API",
    version="1.0.0"
)



# Creation of the Tables in the Database 
Base.metadata.create_all(bind=engine)

# Register Error Handler
app.add_exception_handler(IntegrityError, handle_integrity_error)
app.add_exception_handler(Exception, generic_exception_handler)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],          
    allow_credentials=True,
    allow_methods=["*"],             
    allow_headers=["*"],             
    )

# Register Routes
app.include_router(app_router,prefix='/api')
