import { useState, createContext } from "react";
import Goals from "./components/Goals";
import Goal from "./components/Goal";
import LoginRegister from "./components/LoginRegister";
import Nav from "./components/Nav";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Auth } from "./auth/Auth";

export const AppContext = createContext(null);

function App() {
  const [token, setToken] = useState(null);

  return (
    <AppContext.Provider value={{ token, setToken }}>
      <div className="App">
        <BrowserRouter>
          <Nav />

          <Routes>
            <Route path="/" element={<Goals />} />
            <Route path="/goals" element={<Auth><Goals /></Auth>} />
            <Route path="/goal/:id" element={<Goal />} />
            <Route path="/login" element={<LoginRegister title="Login" />} />
            <Route
              path="/register"
              element={<LoginRegister title="Register" />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </AppContext.Provider>
  );
}

export default App;