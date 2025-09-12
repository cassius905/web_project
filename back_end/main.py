from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


# 분리된 라우터들을 import 합니다.
from routers import user, community

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# app에 라우터들을 포함시킵니다.
# prefix를 사용하면 경로를 그룹화할 수 있고, tags는 API 문서(Swagger)를 정리해줍니다.
app.include_router(user.router, tags=["User"])
app.include_router(community.router, tags=["Community"])

# 서버가 시작될 때 간단한 메시지를 표시할 수 있습니다.
@app.get("/")
def read_root():
    return {"message": "Welcome to the API!"}