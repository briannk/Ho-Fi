import logo from "./logo.svg";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import Error from "./components/Error";
import { useAuthContext } from "./contexts/AuthContext";

import "./App.css";

function App() {
  const { user } = useAuthContext();

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route exact path="/" element={user ? <Dashboard /> : <Home />} />
        <Route path="*" element={<Error />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
