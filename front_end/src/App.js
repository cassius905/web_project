import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

//pages
import Main  from "./pages/Main.jsx";
import Login from "./pages/Login.jsx"
import Join from "./pages/Join.jsx";
import Header from "./pages/Header.jsx";
import JoinComplete from "./pages/JoinComplete.jsx"; 
import Community from "./pages/communityPage/Community.jsx";
import CommunityWrite from "./pages/communityPage/CommunityWrite.jsx"
import CommunityDetail from "./pages/communityPage/CommunityDetail.jsx";
// components
import PrivateRoute from "./components/PrivateRoute.jsx";
import LoginCantLogin from "./components/LoginCantLogin.jsx";
import axios from "axios";


function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userIdx, setUserIdx] = useState('');
    const [userNick, setUserNick] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchUserData = async () => {
            const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
            const storedUserIdx = localStorage.getItem('userIdx');

            if (storedIsLoggedIn === 'true' && storedUserIdx) {
                try {
                    // ... (닉네임 가져오는 API 호출은 동일)
                    const userData = { useridx: parseInt(storedUserIdx) };
                    const response = await axios.post('http://127.0.0.1:8000/headerData', userData);
                    
                    // 상태를 한 번에 업데이트하여 불필요한 렌더링을 줄입니다.
                    setIsLoggedIn(true);
                    setUserIdx(storedUserIdx);
                    setUserNick(response.data.nick);
                } catch (err) {
                    console.error("헤더 데이터 가져오기 오류:", err);
                    handleLogout();
                }
            }
            // 2. 로그인 정보 확인이 끝나면 로딩 상태를 false로 변경합니다.
            setLoading(false);
        };
        fetchUserData();
    }, []);

    const handleLogin = async (loggedInUserIdx) => {
        // 2. 로그인 성공 시, isLoggedIn과 userIdx를 모두 localStorage에 저장합니다.
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userIdx', loggedInUserIdx);
        
        setIsLoggedIn(true);
        setUserIdx(loggedInUserIdx);

        try {
            const userData = { useridx: loggedInUserIdx };
            const response = await axios.post('http://127.0.0.1:8000/headerData', userData);
            setUserNick(response.data.nick);
        } catch (err) {
            console.error("로그인 시 닉네임 가져오기 오류:", err);
        }
    };

    const handleLogout = () => {
        // 3. 로그아웃 시, 모든 관련 정보를 localStorage에서 삭제합니다.
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userIdx');
        
        setIsLoggedIn(false);
        setUserIdx('');
        setUserNick('');
        navigate('/');
    };

    // 3. 로딩 중일 때는 아무것도 렌더링하지 않거나 로딩 스피너를 보여줍니다.
    if (loading) {
        return <div>Loading...</div>; // 또는 return null;
    }

  return (
    <div>
      <Header isLoggedIn={isLoggedIn} userNick={userNick} onLogout={handleLogout}/>
      <Routes>
        <Route path="/main" element={<PrivateRoute isLoggedIn={isLoggedIn}><Main/></PrivateRoute>}/>
        <Route path="/join" element={<LoginCantLogin isLoggedIn={isLoggedIn}><Join/></LoginCantLogin>}/>
        <Route path="/" element={<LoginCantLogin isLoggedIn={isLoggedIn}><Login onLogin={handleLogin}/></LoginCantLogin>}/>
        <Route path="/joinComplete" element={<JoinComplete/>}/>
        <Route path="/community" element={<PrivateRoute isLoggedIn={isLoggedIn} ><Community/></PrivateRoute>}/>
        <Route path="/communityWrite" element={<PrivateRoute isLoggedIn={isLoggedIn} ><CommunityWrite userIdx={userIdx}/></PrivateRoute>}/>
        <Route path="/communityDetail" element={<PrivateRoute isLoggedIn={isLoggedIn}><CommunityDetail/></PrivateRoute>}/>
      </Routes>
    </div>
  );
}

export default App;
