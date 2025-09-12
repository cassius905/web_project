import styles from './Community.module.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';


const Community = () => {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. 최초 게시글 목록을 불러오는 useEffect
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/community/posts');
        setPosts(response.data);
        console.log('넘겨받은 값', response.data)
      } catch (error) {
        console.error("게시글 로딩 실패:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);


  // // 2. 웹소켓 연결 및 메시지 수신을 위한 useEffect
  // useEffect(() => {
  //   // 백엔드의 웹소켓 주소와 연결합니다.
  //   const socket = new WebSocket('ws://127.0.0.1:8000/ws/community');

  //   // 연결이 성공했을 때
  //   socket.onopen = () => {
  //     console.log("WebSocket 연결 성공");
  //   };

  //   // 서버로부터 메시지(새 글 정보)를 받았을 때
  //   socket.onmessage = (event) => {
  //     const newPost = JSON.parse(event.data);
  //     // 기존 게시글 목록의 맨 앞에 새 글을 추가하여 상태를 업데이트합니다.
  //     setPosts(prevPosts => [newPost, ...prevPosts]);
  //   };

  //   // 연결이 닫혔을 때
  //   socket.onclose = () => {
  //     console.log("WebSocket 연결 종료");
  //   };

  //   // 컴포넌트가 언마운트될 때(페이지를 벗어날 때) 소켓 연결을 정리합니다.
  //   return () => {
  //     socket.close();
  //   };
  // }, []); // 이 useEffect도 최초 한 번만 실행합니다.


  return (
    <div className={styles['community-container']}>
      <aside className={styles.sidebar}>
        <h1 className={styles['C-logo']}>Community</h1>
        <nav className={styles.menu}>
          <a href="#" className={`${styles['menu-item']} ${styles.active}`}>홈</a>
          <a href="#" className={styles['menu-item']}>인기글</a>
          <a href="#" className={styles['menu-item']}>최신글</a>
          <a href="#" className={styles['menu-item']}>공지사항</a>
        </nav>
      </aside>

      <main className={styles['content-area']}>
        <header className={styles['content-header']}>
          <h2>인기글</h2>
          <Link to='/communityWrite'><button className={styles['write-button']}>글쓰기</button></Link>
        </header>

        <section className={styles['post-list']}>
          {/* 게시글 목록이 여기에 표시됩니다 */}
          {posts.map(post => (
          <div className={styles['post-item']} key={post.COM_IDX} >
            
            <h3>{post.TITLE}</h3>
            <p>{post.USER_NICK} · 10분 전 | <span className={styles['emoji']}>❤️ {post.GOOD_COUNT}</span></p>
            
          </div>
          ))}
        </section>
      </main>
    </div>
  )
}

export default Community;