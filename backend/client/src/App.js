import { useState, createContext, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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
  const [uploaded, setUploaded] = useState(null)
  const [userInfo, setUserInfo] = useState({
    id: null,
    user_email: ''
  })

  useEffect(() => {
    fetchUserInfo()
  }, [token, uploaded])

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get("/api/users");
      const data = response.data
      setUserInfo({
        id: data[0].id,
        user_email: data[0].user_email
      })
    } catch (err) {
      console.log(err)
    }
  }



  return (
    <AppContext.Provider value={{ token, setToken, userInfo, setUserInfo, uploaded, setUploaded }}>
      <div className="app">
        {token && <Auth><Nav /></Auth>}
        <Routes>
          {token ? (
            <>
              <Route path="/freetime" element={<Auth><FreeTime /></Auth>} />
              <Route path="/goals/:userEmail" element={<Auth><Goals /></Auth>} />
              <Route path="/goal/:id" element={<Auth><GoalActions /></Auth>} />
            </>
          ) : (
            <>
              <Route path="*" element={<Navigate to="/login" />} />
              <Route path="/" element={<Welcome />} />
              <Route path="/login" element={<LoginRegister title="Login" />} />
            </>
          )}
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;