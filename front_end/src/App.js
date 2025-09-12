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
    const [userIdx, setUserIdx] = useState('')
    const [userNick, setUserNick] = useState('')
    const navigate = useNavigate(); 

    useEffect(() => {
        const storedUserIdx = localStorage.getItem('userIdx');
        if (storedUserIdx) {
            setIsLoggedIn(true);
            setUserIdx(storedUserIdx);
        }
    }, []);

    const handleLogin = async (loggedInUserIdx) => {
        console.log('handleLogin', loggedInUserIdx);
        setIsLoggedIn(true);
        setUserIdx(loggedInUserIdx); // 이 state 업데이트는 다음 렌더링에 반영됩니다.

        // ⬇️ 이 부분을 수정합니다 ⬇️
        // state인 userIdx 대신, 인자로 받은 loggedInUserIdx를 직접 사용합니다.
        let userData = {
            useridx: loggedInUserIdx
        };
        
        try {
            const response = await axios.post('http://127.0.0.1:8000/headerData', userData);
            
            let nickname = response.data.nick;
            setUserNick(nickname);
            
        } catch (err) {
            console.error("헤더 데이터 가져오기 오류:", err);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('userIdx');
        setIsLoggedIn(false);
        setUserIdx('');
        setUserNick('');
        navigate('/');
    };



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
