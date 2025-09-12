import styles from './Header.module.css';
import { Link } from 'react-router-dom';

// App.js로부터 isLoggedIn, username, onLogout 함수를 props로 받습니다.
const Header = ({ isLoggedIn, onLogout, userNick }) => {
  console.log(userNick)
  return (
    <>
      {/* 1. 최상위 태그에 CSS 모듈 클래스를 적용하여 스타일 공유를 방지합니다. */}
      <header className={styles.headerContainer}>
        <h1 className={styles.logo}>
          {isLoggedIn ? (
            <Link to='/main'>G</Link>
          ) : (
            <Link to='/'>G</Link>
          )}
        </h1>
        {isLoggedIn ? (
          // 2. 하이픈(-)이 포함된 클래스 이름은 대괄호([]) 표기법을 사용해야 합니다.
          <div className={styles['full-user-menu']}>
            <div className={styles['top-menu-container']}>
              <Link to="/community" className={styles['top-menu-button']}>커뮤니티</Link>
            </div>
            <div className={styles['user-menu']}>
              <span>{userNick}님 환영합니다!</span>
              <Link to="/">
                {/* 버튼에 직접 onClick 이벤트를 연결하는 것이 더 명확합니다. */}
                <button onClick={onLogout}>로그아웃</button>
              </Link>
            </div>
          </div>
        ) : (
          // 로그인하지 않았을 때는 아무것도 표시하지 않습니다.
          null
        )}
      </header>
    </>
  );
};

export default Header;