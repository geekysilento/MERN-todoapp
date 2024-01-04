import './App.css'
import Signin from './components/Signin'
import Dashboard from './components/Dashboard';
import Signup from './components/Signup';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
          <Router>
              <Routes>
                  <Route path='/login' element={<Signin />} />
                  <Route path='/signup' element={<Signup />} />
                  <Route path='/todos' element={<Dashboard />} />
                  <Route path='/' element={<Signin />} />
              </Routes>
          </Router>
  );
}

export default App;
