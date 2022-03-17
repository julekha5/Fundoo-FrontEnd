import Login from './pages/Login';
import Registration from './pages/Registration';
import Navbar from './components/Navbar/Navbar';
import ForgotPassword from './components/Login/ForgotPassword';
import ResetPassword from './components/Login/ResetPassword';

import {
  Routes,
  Route,
} from "react-router-dom";


function App() {
  return (
    <div className="App">
     <Navbar/>
     <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/registration" element={<Registration/>} />
        <Route path="/forgotPassword" element={<ForgotPassword/>} />
        <Route path="/resetPassword/:token" element={<ResetPassword/>} />

      </Routes>  
    </div>
  );
}

export default App
