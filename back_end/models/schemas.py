from pydantic import BaseModel

class LoginRequest(BaseModel):
    username: str
    password: str
    
class JoinRequest(BaseModel):
    username: str
    password: str
    email : str
    nickname : str
    
class CheckRequest(BaseModel):
    username: str 
    
class CheckRequest2(BaseModel):
    nickname: str 
    
class CommunityWrite(BaseModel):
    title : str
    content : str
    useridx : int
    
class HeaderData(BaseModel):
    useridx : int