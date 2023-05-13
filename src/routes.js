import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './Register'
import Login from './Login'
import App from './App'
import About from './About'
import Theory from './Theory'

function R() {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />}/>
            <Route path="register" element={<Register />} />
            <Route path="/auth" element={<App />} />
            <Route path="/about" element={<About />} />
            <Route path="/theory" element={<Theory />} />
        </Routes>
        </BrowserRouter>
    );
}

export default R;
