from sqlmodel import Field, Session, SQLModel, create_engine, select



def database():
# 1. MySQL 접속 정보 설정 (사용자 환경에 맞게 수정하세요)
    db_user = "root"
    db_password = "1234"
    db_host = "localhost"
    db_port = "3306"
    db_name = "project" # 미리 생성된 데이터베이스 이름


    # 2. MySQL 연결 URL 생성
    # 형식: "mysql+pymysql://사용자이름:비밀번호@호스트:포트/DB이름"
    mysql_url = f"mysql+pymysql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}"
    return mysql_url


# DB 엔진 생성
engine = create_engine(database())


# database.py 또는 main.py 어딘가에 있을 코드
def get_session():
    db = Session(engine)
    try:
        yield db
    finally:
        db.close()

# 사용자 정보 테이블 모델
class user_join_info(SQLModel, table=True ):
    USER_IDX: int= Field(default=None, primary_key=True)
    USER_NAME: str
    USER_PASSWORD: str
    USER_EMAIL : str
    USER_NICK : str

# 커뮤니티 게시글 테이블 모델
class community_info(SQLModel, table=True):
    COM_IDX: int = Field(default=None, primary_key=True)
    USER_IDX: int = Field(foreign_key="user_join_info.USER_IDX")
    TITLE: str
    CONTENT: str
    GOOD_COUNT: int
    