import "./app.css";

import Login from "./components/Login";
import Signup from "./components/SIgnup";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import WelcomePage from "./pages/WelcomePage";
import ContactPage from "./pages/ContactPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomePage />}></Route>
          <Route path="/Home" element={<HomePage />}></Route>
          <Route path="/About" element={<AboutPage />}></Route>
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Contact" element={<ContactPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
