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