import LoginForm from './components/Login/LoginForm';
import RegistrationForm from './components/Registration/RegistrationForm'
import ForgotPassword from './components/Login/ForgotPassword';
import ResetPassword from './components/Login/ResetPassword';
import Dashboard from './components/Dashboard/Dashboard'
import ArchiveNote from './components/Dashboard/ArchiveNote'
import Note from './components/Dashboard/Note'
import TrashNote from './components/Dashboard/TrashNote'
import {Routes, Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
     <Routes>
        <Route path="/" element={<LoginForm/>} />
        <Route path="/login" element={<LoginForm/>} />
        <Route path="/registration" element={<RegistrationForm/>} />
        <Route path="/forgotPassword" element={<ForgotPassword/>} />
        <Route path="/resetPassword/:token" element={<ResetPassword/>} />
        <Route path="/dash" element={<Dashboard/>} />
        <Route path="/note" element={<Note/>}/>
        <Route path="/archive" element={<ArchiveNote/>} />
        <Route path="/trash" element={<TrashNote/>} /> 
      </Routes> 
      
    </div>
  );
}

export default App
