import logo from "./logo.svg";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import Error from "./components/Error";
import PwReset from "./components/PwReset";
import { useAuthContext } from "./contexts/AuthContext";

import "./App.css";
import ExpenseForm from "./components/ExpenseForm";
import IncomeForm from "./components/IncomeForm";
import Expenses from "./components/Expenses";
import Income from "./components/Income";
import Budgeting from "./components/Budgeting";
// import Loading from "./components/Loading";

function App() {
  const { user, isLoggedIn } = useAuthContext();
  // console.log(isLoggedIn);

  return (
    <Router>
      <Navbar>
        <Routes>
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/dashboard" /> : <LogIn />}
          />
          <Route
            path="/signup"
            element={isLoggedIn ? <Navigate to="/dashboard" /> : <SignUp />}
          />
          <Route
            path="/resetpassword"
            element={isLoggedIn ? <Navigate to="/dashboard" /> : <PwReset />}
          />
          <Route
            path="/dashboard"
            element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/expenses/"
            element={isLoggedIn ? <Expenses /> : <Navigate to="/login" />}
          />
          <Route
            path="/expenses/add"
            element={isLoggedIn ? <ExpenseForm /> : <Navigate to="/login" />}
          />
          <Route
            path="/income"
            element={isLoggedIn ? <Income /> : <Navigate to="/login" />}
          />
          <Route
            path="/income/add"
            element={isLoggedIn ? <IncomeForm /> : <Navigate to="/login" />}
          />
          <Route
            path="/budgeting"
            element={isLoggedIn ? <Budgeting /> : <Navigate to="/login" />}
          />
          <Route
            exact
            path="/"
            element={isLoggedIn ? <Navigate to="/dashboard" /> : <Home />}
          />
          <Route path="*" element={<Error />}></Route>
        </Routes>
      </Navbar>
    </Router>
  );
}

export default App;
