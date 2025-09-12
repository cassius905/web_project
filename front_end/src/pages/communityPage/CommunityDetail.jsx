import styles from './CommunityDetail.module.css';

const CommunityDetail = () => {
  // 실제로는 props나 API로부터 데이터를 받아옵니다.
  const post = {
    title: '리액트 질문 있습니다!',
    author: '김개발',
    timestamp: '2025년 9월 4일',
    content: '리액트에서 상태 관리를 할 때 Redux 말고 다른 좋은 방법이 있을까요? Context API는 어떻게 사용하는 건가요?',
    comments: [
      { id: 1, author: '박코딩', text: 'Zustand나 Recoil도 많이 사용해요!' },
      { id: 2, author: '최프론트', text: 'Context API는 간단한 상태 공유에 적합합니다.' },
    ],
  };

  return (
    <div className={styles['detail-container']}>
      <div className={styles['post-header']}>
        <h1 className={styles['post-title']}>{post.title}</h1>
        <div className={styles['post-meta']}>
          <span className={styles['author-name']}>{post.author}</span>
          <span className={styles.timestamp}>{post.timestamp}</span>
        </div>
      </div>

      <div className={styles['post-content']}>
        <p>{post.content}</p>
      </div>

      <div className={styles['post-actions']}>
        <button>수정</button>
        <button>삭제</button>
      </div>

      <div className={styles['comment-section']}>
        <h2>댓글 ({post.comments.length})</h2>
        <div className={styles['comment-list']}>
          {post.comments.map(comment => (
            <div key={comment.id} className={styles['comment-item']}>
              <span className={styles['comment-author']}>{comment.author}</span>
              <p className={styles['comment-text']}>{comment.text}</p>
            </div>
          ))}
        </div>
        <div className={styles['comment-input-area']}>
          <textarea placeholder="댓글을 입력하세요"></textarea>
          <button>댓글 등록</button>
        </div>
      </div>
    </div>
  );
};

export default CommunityDetail;