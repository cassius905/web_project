import React, { useState } from 'react'; // useState를 import 합니다.
import styles from './Main.module.css';
import { Link } from 'react-router-dom'; // Link를 import 합니다.

// 돋보기 아이콘 (SVG)
const SearchIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22">
    <path fill="#ffffff" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
  </svg>
);

const Main = () => {
  // 1. 검색어 입력을 위한 state를 추가합니다.
  const [query, setQuery] = useState('');

  // 2. onKeyDown 이벤트 핸들러를 수정합니다.
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && query) {
      window.location.href = `https://www.google.com/search?q=${query}`;
    }
  };

  // 3. onClick 이벤트 핸들러를 수정합니다.
  const handleSearchClick = () => {
    if (query) {
      window.location.href = `https://www.google.com/search?q=${query}`;
    }
  };

  return (
    <>
      {/* className들을 styles 객체를 사용하도록 수정 */}
      <div className={styles['mypage-container']}>
        <main className={styles['main-content']}>
          {/* <a> 태그를 <Link>로 변경 */}
          <Link to='/main'><h1 className={styles.logo}>Green</h1></Link>
          <div className={styles['search-bar']}>
            <input 
              type="text" 
              className={styles['search-input']} 
              placeholder="검색어를 입력하세요"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className={styles['search-button']} onClick={handleSearchClick}>
              <SearchIcon />
            </button>
          </div>
          {/* 외부 링크는 a 태그를 그대로 사용합니다. */}
          <div className={styles['shortcut-links']}>
            <a href="https://mail.google.com" className={styles['link-item']}>Gmail</a>
            <a href="https://www.youtube.com" className={styles['link-item']}>YouTube</a>
            <a href="https://github.com" className={styles['link-item']}>GitHub</a>
            <a href="https://www.instagram.com" className={styles['link-item']}>Instagram</a>
          </div>
        </main>
      </div>
    </>
  );
};

export default Main;