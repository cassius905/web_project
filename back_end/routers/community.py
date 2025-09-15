from fastapi import APIRouter, Depends, WebSocket
from sqlmodel import Session, select

from modules.database import user_join_info, community_info, get_session
from models.schemas import CommunityWrite

router = APIRouter()

@router.post("/write")
def write(request_data : CommunityWrite, db : Session = Depends(get_session)):
    # ... (기존 /write 함수의 모든 코드) ...
    new_post = community_info(TITLE=request_data.title, CONTENT=request_data.content, USER_IDX=request_data.useridx, GOOD_COUNT=0)
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return {"message": "게시글이 성공적으로 등록되었습니다."}

@router.get("/community/posts")
def get_posts(db: Session = Depends(get_session)):
    # ... (기존 /community/posts 함수의 모든 코드) ...
    query = select(community_info, user_join_info.USER_NICK).join(user_join_info, community_info.USER_IDX == user_join_info.USER_IDX)
    results = db.exec(query).all()
    
    post_list = []
    for post, nick in results:
        post_data = post.model_dump()
        post_data['USER_NICK'] = nick
        post_list.append(post_data)
        
    return post_list

@router.websocket("/ws/community")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        await websocket.send_text(f"Message text was: {data}")