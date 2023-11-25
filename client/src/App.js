import { useState, createContext } from "react";
import Goals from "./components/Goals";
import GoalActions from "./components/Goal";
import Auth from "./components/LoginRegister";
import Nav from "./components/Nav";
import Welcome from "./components/Welcome";
import FreeTime from "./components/FreeTime";
import "./index.css";
import "./home.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";


export const AppContext = createContext(null);

function App() {
  const [token, setToken] = useState(null);

  return (
    <AppContext.Provider value={{ token, setToken }}>
      <div className="app">
        <BrowserRouter>
          <Nav />

          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/freetime" element={<FreeTime />} />
            <Route path="/goals/:userEmail" element={<Goals />} />
            <Route path="/goal/:id" element={<GoalActions />} />
            <Route path="/login" element={<Auth title="Login" />} />
            <Route
              path="/signup"
              element={<Auth title="Sign Up" />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </AppContext.Provider>
  );
}

export default App;