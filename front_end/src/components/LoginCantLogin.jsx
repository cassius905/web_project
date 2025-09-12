import { Navigate } from 'react-router-dom'; // Navigate를 import 해야 합니다.

const LoginCantLogin = ({ isLoggedIn, children }) => {
  if (isLoggedIn) {
    // 이미 로그인했다면, 메인 페이지('/main')로 보내버립니다 (리디렉션).
    return <Navigate to="/main" replace/>;
  }

  // 로그인하지 않았다면, 자식 컴포-넌트(로그인/회원가입 페이지)를 그대로 보여줍니다.
  return children;
};

export default LoginCantLogin;