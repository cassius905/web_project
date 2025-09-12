import styles from './Login.module.css' ;
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loginState, setLoginState] = useState(false);
  
  const handleLogin = async (e) => {
    e.preventDefault();

    const userData = {
      username: userName,
      password: password
    };
      
    try{ 
      const response = await axios.post('http://127.0.0.1:8000/login', userData);
      if(response.data.res === 1){
        localStorage.setItem('UserIdx', response.data.idx);
        onLogin(response.data.idx);
        // 페이지 이동은 App.js의 useEffect가 처리하므로 여기서는 navigate를 호출하지 않습니다.
      } else {
        // alert(response.data.message || "아이디 또는 비밀번호가 일치하지 않습니다.");
        
      }
    }catch(err){
      console.error("로그인 에러", err);
      setLoginState(true)
    }
  };

  return (
    // className들을 styles 객체를 사용하도록 수정
    <div className={styles['login-container']}>
      <div className={styles['login-box']}>
        {/* <a> 태그를 <Link>로 변경 */}
        <Link to="/"><h1 className={styles['login-logo']}>Green</h1></Link>
        <form className={styles['login-form']} onSubmit={handleLogin}>
          <div className={styles['input-group']}>
            <input 
              type="text" 
              placeholder="아이디" 
              value={userName}
              onChange={(e)=> setUserName(e.target.value)}
              onClick ={() => setLoginState(false)}
            />
          </div>
          <div className={styles['input-group']}>
            <input 
              type="password" 
              placeholder="비밀번호" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onClick ={() => setLoginState(false)}
            />
          </div>
          <button type="submit" className={styles['login-button']}>
            로그인
          </button>
        </form>
        <div className={styles['login-options']}>
          {/* 페이지 이동이 없는 링크는 button으로 변경하는 것이 좋습니다. */}
          {/* <button type="button" className={styles['link-style-button']}>비밀번호 찾기</button> */}
          {/* <span>|</span> */}
          {loginState ? (
            <p className={styles['password-text']}>아이디 또는 비밀번호가 일치하지 않습니다.</p>
          ):(
            <></>
          )}
          <Link to='/join'>회원가입</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;