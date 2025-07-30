from pydantic import BaseModel, EmailStr

class userCreate(BaseModel):
    email: EmailStr
    password: str

class userLogin(BaseModel):
    email: EmailStr
    password: str

class userOut(BaseModel):
    id: int
    email: EmailStr

    class Config:
        orm_mode = True