from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError

from modules.database import user_join_info, get_session
from  models.schemas import LoginRequest, JoinRequest, CheckRequest, CheckRequest2, HeaderData

# APIRouter 객체 생성
router = APIRouter()
ph = PasswordHasher()

@router.post("/login")
def process_login(request_data: LoginRequest, db: Session = Depends(get_session)):
    # ... (기존 /login 함수의 모든 코드) ...
    query = select(user_join_info).where(user_join_info.USER_NAME == request_data.username)
    user_from_db = db.exec(query).first()
    if not user_from_db:
        raise HTTPException(status_code=404, detail="아이디 또는 비밀번호가 잘못되었습니다.")
    try:
        if ph.verify(user_from_db.USER_PASSWORD, request_data.password):
            return {"message": "로그인 성공!", "res": 1, "idx" : user_from_db.USER_IDX}
    except VerifyMismatchError:
        raise HTTPException(status_code=404, detail="아이디 또는 비밀번호가 잘못되었습니다.")

@router.post("/join")
def process_join(request_data : JoinRequest, db: Session = Depends(get_session)):
    # ... (기존 /join 함수의 모든 코드) ...
    hashed_password = ph.hash(request_data.password)
    new_user = user_join_info(USER_NAME=request_data.username, USER_PASSWORD=hashed_password, USER_EMAIL=request_data.email, USER_NICK=request_data.nickname)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {'message': "회원가입에 성공하셨습니다."}

@router.post("/checkid")
def check_id(request_data : CheckRequest, db: Session = Depends(get_session)):
    # ... (기존 /checkid 함수의 모든 코드) ...
    query = select(user_join_info).where(user_join_info.USER_NAME == request_data.username)
    user_from_db = db.exec(query).first()
    return {"isDuplicate": bool(user_from_db)}

@router.post("/checknick")
def check_nick(requestdata : CheckRequest2, db: Session = Depends(get_session)):
    # ... (기존 /checknick 함수의 모든 코드) ...
    query = select(user_join_info).where(user_join_info.USER_NICK == requestdata.nickname)
    nick_from_db = db.exec(query).first()
    return {"isDuplicate": bool(nick_from_db)}

@router.post('/headerData')
def header_data(request_data : HeaderData, db : Session = Depends(get_session)):
    # ... (기존 /headerData 함수의 모든 코드) ...
    query = select(user_join_info).where(user_join_info.USER_IDX == request_data.useridx)
    user_from_db = db.exec(query).first()
    return {'nick' : user_from_db.USER_NICK}