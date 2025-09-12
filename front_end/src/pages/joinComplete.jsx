import { Link } from "react-router-dom";
import styles from './JoinComplete.module.css';

const CheckCircleIcon = () => (
    <svg 
        className={styles['check-icon']} // className을 styles 객체를 사용하도록 수정
        xmlns="http://www.w3.org/2000/svg" 
        width="80" 
        height="80" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="#03c75a" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
    >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
);

const JoinComplete = () => {
    return (
        <>
            <div className={styles['join-complete-wrapper']}>
                <div className={styles['join-complete-container']}>
                    <CheckCircleIcon />
                    <h1 className={styles['complete-title']}>
                        회원가입 완료!
                    </h1>
                    <p className={styles['complete-message']}>
                        Green의 회원이 되신 것을 환영합니다.
                    </p>
                    <Link to="/" className={styles['login-link-button']}>
                        로그인 페이지로 이동
                    </Link>
                </div>
            </div>
        </>
    );
};

export default JoinComplete;