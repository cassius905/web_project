import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styles from './Join.module.css';
import axios from 'axios';

const Join = () => {
    const [formData, setFormData] = useState({
        nickName: '',
        userName: '',
        password: '',
        passwordConfirm: '',
        email: ''
    });
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [idCheckStatus, setIdCheckStatus] = useState('idle');
    const [nickCheckStatus, setNickCheckStatus] = useState('idle');

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleBlur = (e) => {
        const { id, value } = e.target;
        if (id !== 'userName' && id !== 'nickName') {
            validateField(id, value);
        }
    };

    // useEffect 바깥에서 필요한 값을 미리 추출합니다.
    const { userName, nickName } = formData;

    // 아이디 중복 확인을 위한 함수 (useCallback으로 최적화)
    const checkIdDuplication = useCallback(async (currentUserName) => {
        setIdCheckStatus('checking');
        try {
            const response = await axios.post('http://127.0.0.1:8000/checkid', { username: currentUserName });
            setIdCheckStatus(response.data.isDuplicate ? 'duplicate' : 'available');
        } catch (err) {
            console.error("ID 중복 확인 오류:", err);
            setErrors(prev => ({ ...prev, userName: '중복 확인 중 오류가 발생했습니다.' }));
            setIdCheckStatus('idle');
        }
    }, []); // 이 함수는 외부 의존성이 없으므로 빈 배열

    // 닉네임 중복 확인을 위한 함수 (useCallback으로 최적화)
    const checkNickDuplication = useCallback(async (currentNickName) => {
        setNickCheckStatus('checking');
        try {
            const response = await axios.post('http://127.0.0.1:8000/checknick', { nickname: currentNickName });
            setNickCheckStatus(response.data.isDuplicate ? 'duplicate' : 'available');
        } catch (err) {
            console.error("NICK 중복 확인 오류:", err);
            setErrors(prev => ({ ...prev, nickName: '중복 확인 중 오류가 발생했습니다.' }));
            setNickCheckStatus('idle');
        }
    }, []); // 이 함수는 외부 의존성이 없으므로 빈 배열

    // 아이디(userName) 입력을 위한 useEffect (디바운싱 적용)
    useEffect(() => {
        const idRegex = /^[a-z0-9_-]{5,20}$/;
        const handler = setTimeout(() => {
            if (!userName) {
                setErrors(prev => ({ ...prev, userName: '' }));
                setIdCheckStatus('idle');
                return;
            }
            if (!idRegex.test(userName)) {
                setErrors(prev => ({ ...prev, userName: '5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.' }));
                setIdCheckStatus('idle');
            } else {
                setErrors(prev => ({ ...prev, userName: '' }));
                checkIdDuplication(userName);
            }
        }, 500);

        return () => clearTimeout(handler);
    }, [userName, checkIdDuplication]); // 의존성 배열에 userName과 함수를 명시합니다.

    // 닉네임(nickName) 입력을 위한 useEffect (디바운싱 적용)
    useEffect(() => {
        const handler = setTimeout(() => {
            if (!nickName) {
                setErrors(prev => ({ ...prev, nickName: '' }));
                setNickCheckStatus('idle');
                return;
            }
            if (nickName.length < 2 || nickName.length > 10) {
                setErrors(prev => ({ ...prev, nickName: '닉네임은 2~10자로 입력해주세요.' }));
                setNickCheckStatus('idle');
            } else {
                setErrors(prev => ({ ...prev, nickName: '' }));
                checkNickDuplication(nickName);
            }
        }, 500);

        return () => clearTimeout(handler);
    }, [nickName, checkNickDuplication]); // 의존성 배열에 nickName과 함수를 명시합니다.


    const validateField = (id, value) => {
        let newErrors = { ...errors };
        const pwRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;

        switch (id) {
            case 'password':
                newErrors.password = pwRegex.test(value) ? '' : '8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요.';
                if (formData.passwordConfirm && value !== formData.passwordConfirm) {
                    newErrors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
                } else if (formData.passwordConfirm) {
                    newErrors.passwordConfirm = '';
                }
                break;
            case 'passwordConfirm':
                newErrors.passwordConfirm = formData.password === value ? '' : '비밀번호가 일치하지 않습니다.';
                break;
            case 'email':
                newErrors.email = (value === '' || emailRegex.test(value)) ? '' : '이메일 주소가 정확한지 확인해 주세요.';
                break;
            default:
                break;
        }
        setErrors(newErrors);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (idCheckStatus !== 'available') {
            alert('아이디 중복 확인을 완료해주세요.');
            return;
        }
        if (nickCheckStatus !== 'available') {
            alert('닉네임 중복 확인을 완료해주세요.');
            return;
        }
        
        let hasError = Object.values(errors).some(error => error);
        if (hasError || !formData.password || !formData.passwordConfirm) {
            alert('입력 정보를 다시 확인해주세요.');
            return;
        }

        try {
            let userData = {
                nickname : formData.nickName,
                username : formData.userName,
                password : formData.password,
                email : formData.email
            }
            const response = await axios.post("http://localhost:8000/join", userData);
            alert(response.data.message);
            navigate("/joinComplete");
        } catch (err) {
            console.error("회원가입 오류:", err);
            alert("회원가입 처리 중 오류가 발생했습니다.");
        }
    };
    
    const { password, passwordConfirm } = formData;
    const hasInputErrors = Object.values(errors).some(error => error);
    const requiredFieldsEmpty = !nickName || !userName || !password || !passwordConfirm;
    const isButtonDisabled = hasInputErrors || requiredFieldsEmpty || idCheckStatus !== 'available' || nickCheckStatus !== 'available';

    const IdFeedback = () => {
        if (errors.userName) return <p className={styles['error-message']}>{errors.userName}</p>;
        if (idCheckStatus === 'checking') return <p className={styles['checking-message']}>확인 중입니다...</p>;
        if (idCheckStatus === 'duplicate') return <p className={styles['error-message']}>이미 사용 중인 아이디입니다.</p>;
        if (idCheckStatus === 'available') return <p className={styles['success-message']}>사용 가능한 아이디입니다.</p>;
        return null;
    };

    const NickFeedback = () => {
        if (errors.nickName) return <p className={styles['error-message']}>{errors.nickName}</p>;
        if (nickCheckStatus === 'checking') return <p className={styles['checking-message']}>확인 중입니다...</p>;
        if (nickCheckStatus === 'duplicate') return <p className={styles['error-message']}>이미 사용 중인 닉네임입니다.</p>;
        if (nickCheckStatus === 'available') return <p className={styles['success-message']}>사용 가능한 닉네임입니다.</p>;
        return null;
    };

    return (
        <>
            <div className={styles['signup-wrapper']}>
                <div className={styles['signup-container']}>
                    <h1 className={styles.logo}><Link to="/">Green</Link></h1>
                    <form id="signupForm" onSubmit={handleSubmit}>
                        
                        <div className={styles['input-group']}>
                            <label htmlFor="nickName">닉네임</label>
                            <input type="text" id="nickName" className={styles['input-field']} value={formData.nickName} onChange={handleChange} />
                            <NickFeedback />
                        </div>

                        <div className={styles['input-group']}>
                            <label htmlFor="userName">아이디</label>
                            <input type="text" id="userName" className={styles['input-field']} value={formData.userName} onChange={handleChange} />
                            <IdFeedback />
                        </div>

                        <div className={styles['input-group']}>
                            <label htmlFor="password">비밀번호</label>
                            <input type="password" id="password" className={styles['input-field']} value={formData.password} onChange={handleChange} onBlur={handleBlur} />
                            {errors.password && <p className={styles['error-message']}>{errors.password}</p>}
                        </div>

                        <div className={styles['input-group']}>
                            <label htmlFor="passwordConfirm">비밀번호 재확인</label>
                            <input type="password" id="passwordConfirm" className={styles['input-field']} value={formData.passwordConfirm} onChange={handleChange} onBlur={handleBlur} />
                            {errors.passwordConfirm && <p className={styles['error-message']}>{errors.passwordConfirm}</p>}
                        </div>

                        <div className={styles['input-group']}>
                            <label htmlFor="email">본인 확인 이메일 (선택)</label>
                            <input type="email" id="email" className={styles['input-field']} value={formData.email} onChange={handleChange} onBlur={handleBlur} />
                            {errors.email && <p className={styles['error-message']}>{errors.email}</p>}
                        </div>

                        <button type="submit" className={styles['signup-btn']} disabled={isButtonDisabled}>가입하기</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Join;