import './App.css'
import { useEffect } from 'react';
import Signin from './components/Signin'
import Dashboard from './components/Dashboard';
import Signup from './components/Signup';
import { RecoilRoot } from 'recoil'
import { useSetRecoilState } from 'recoil';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { authState } from './store/authState';


function App() {
  return (
    <RecoilRoot>
      <Router>
        <InitState />
        <Routes>
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/todos' element={<Dashboard />} />
          <Route path='/' element={<Signin />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
}

function InitState() {
  const setAuth = useSetRecoilState(authState);
  const navigate = useNavigate();

  const init = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_ID}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.username) {
        setAuth({ token: data.token, username: data.username });
        navigate("/todos");
      } else {
        navigate("/signup");
      }
    } catch (e) {
      navigate("/signup");
    }
  }
  useEffect(() => {
    init();
  }, [])
  return <></>

}

export default App;
