from passlib.context import CryptContext

pwd_context = CryptContext(
    schemes=["argon2"], 
    deprecated="auto"
)

def hashPassword(password: str) -> str:
    password= pwd_context.hash(password)
    return password

def verifyPassword(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)