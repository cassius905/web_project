import React, { useState } from 'react';
import styles from './CommunityWrite.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위해 import

const CommunityWrite = ({userIdx}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate(); // useNavigate 훅 사용

  // handlePublish 함수를 async 함수로 변경
  const handlePublish = async () => {
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }
    

    const sendData = {
      'title': title,
      'content': content,
      'useridx' : userIdx
    };

    try {
      // await를 사용해 서버 응답을 기다립니다.
      const response = await axios.post('http://127.0.0.1:8000/write', sendData);
      console.log('서버 응답:', response.data);
      alert('게시글이 등록되었습니다.');
      navigate('/community'); // 등록 성공 시 커뮤니티 목록 페이지로 이동
    } catch (err) {
      console.error("게시글 등록 오류:", err);
      alert('게시글 등록 중 오류가 발생했습니다.');
    }
  };

  const handleCancel = () => {
    navigate('/community'); // 취소 시 커뮤니티 목록 페이지로 이동
  };

  return (
    // className들을 styles 객체를 사용하도록 수정
    <div className={styles['editor-container']}>
      <div className={styles['editor-header']}>
        <h1>게시글 작성</h1>
      </div>
      <div className={styles['editor-body']}>
        <input
          type="text"
          className={styles['title-input']}
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className={styles['content-textarea']}
          placeholder="내용을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>
      <div className={styles['editor-footer']}>
        <button className={styles['cancel-button']} onClick={handleCancel}>취소</button>
        <button className={styles['publish-button']} onClick={handlePublish}>
          등록
        </button>
      </div>
    </div>
  );
};

export default CommunityWrite;