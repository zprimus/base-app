// login/register template

// dependencies
import { Routes, Route, Link } from "react-router-dom";

// pages
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';

// components
import HeaderBar from "./components/HeaderBar";

// styles
import './App.css';

function AppContainer() {
  return(
    <div className="App">
      <HeaderBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </div>
    
  )
}

function App() {
  return(
    <Routes>
      <Route path="/" element={<AppContainer/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
    </Routes>
  )
}

export default App;