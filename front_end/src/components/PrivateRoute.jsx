import { Navigate } from 'react-router-dom';

// isLoggedIn: App.js로부터 받은 로그인 상태
// children: 이 컴포넌트가 감싸게 될 페이지 (예: <Main />)
const PrivateRoute = ({ isLoggedIn, children }) => {
console.log(isLoggedIn)
  if (!isLoggedIn) {
    // 로그인하지 않았다면 로그인 페이지('/')로 리디렉션합니다.
    // replace 옵션은 브라우저 히스토리에 현재 경로를 남기지 않아, 
    // 사용자가 '뒤로가기'로 보호된 페이지에 접근하는 것을 막아줍니다.
    return <Navigate to="/" replace />;
  }
  return children;
  // 로그인했다면 요청한 페이지(children)를 그대로 보여줍니다.
};

export default PrivateRoute;
