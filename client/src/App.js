import './App.css';
import LessonSandbox from './Components/LessonSandbox';
import { UserProvider } from './Components/UserContext';
import { Routes, Route } from "react-router-dom";
// import Home from './Components/Home/Home';
// import Landing from './Components/Landing/Landing';
import Login from './Components/Login';
import NavBar from './Components/NavBar';
// import Footer from './Components/Footer/Footer';

function App() {

  return (
    <div className="App">
      {/* The UserProvider provides us with the user state.  */}
      <UserProvider>
      <NavBar />
      <Routes>
        <Route path="/lesson-sandbox" element={<LessonSandbox />}/>
        <Route path="/login" element={<Login />}/>
      </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
