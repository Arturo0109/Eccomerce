from fastapi import FastAPI
from app.db import Base, engine
#from app.api.user.routes import routes as user_api
from app.api.auth.routes import router as auth_router

# This will create the database tables based on your models
# if they don't exist already.
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Ecommerce API",
    description="API for an ecommerce platform.",
    version="0.1.0",
)




@app.get("/")
async def root():
    return {"message": "Welcome to the Ecommerce API"}


app.include_router(auth_router, prefix="/api/v1/auth", tags=["Auth"])
