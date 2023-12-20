import { useState, createContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import Goals from "./components/Goals";
import GoalActions from "./components/Goal";
import LoginRegister from "./components/LoginRegister";
import { Auth } from "./auth/Auth";
import Nav from "./components/Nav";
import Welcome from "./components/Welcome";
import FreeTime from "./components/FreeTime";
import "./index.css";
import "./home.css";





export const AppContext = createContext(null);

function App() {
  const [token, setToken] = useState(null);
  const [userInfo, setUserInfo] = useState({
    id: null,
    user_email: ''
  })

  useEffect(() => {
    fetchUserInfo()
  }, [token])

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get("/user-info", { withCredentials: true });
      const data = response.data;
      console.log("fetchui", data)
      setUserInfo({
        id: data[0].id,
        user_email: data[0].user_email,
      });
    } catch (err) {
      console.log(err)
    }
  }

  const setCookies = (token, userEmail) => {
    document.cookie = `token=${token}; path=/; max-age=36000`;
    document.cookie = `userEmail=${userEmail}; path=/; max-age=36000`;
  };

  return (
    <AppContext.Provider value={{ token, setToken, userInfo, setUserInfo, setCookies }}>
      <Router>
        <div className="app" style={{ background: 'linear-gradient(90deg, #485563 10%, #274c77 90%)' }}>
          {token && <Auth><Nav /></Auth>}
          <Routes>
            {token ? (
              <>
                <Route path="/freetime" element={<Auth><FreeTime /></Auth>} />
                <Route path="/goals/:userEmail" element={<Auth><Goals /></Auth>} />
                <Route path="/newGoal/:userEmail" element={<Auth><GoalActions /></Auth>} />
              </>
            ) : (
              <>
                <Route path="*" element={<Navigate to="/" />} />
                <Route path="/" element={<Welcome />} />
                <Route path="/login" element={<LoginRegister title="Login" />} />
                <Route path="/signup" element={<LoginRegister title="Login" />} />

              </>
            )}
          </Routes>
        </div>
      </Router>
    </AppContext.Provider>
  );
}

export default App;