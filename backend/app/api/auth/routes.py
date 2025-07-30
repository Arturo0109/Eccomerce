from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db import get_db
from app.models.user import User
from app.schemas.user import userCreate, userLogin, userOut
from app.services.auth.service import hash_password, verify_password, create_access_token



router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/register", response_model=userOut)
def register(user: userCreate, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == user.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    new_user = User(email=user.email, hashed_password=hash_password(user.password))
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.post("/login")
def login(user: userLogin, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == user.email).first()
    if not existing or not verify_password(user.password, existing.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    

    token = create_access_token({"sub": db_user.email})
    return {"access_token": token, "token_type": "bearer"}

