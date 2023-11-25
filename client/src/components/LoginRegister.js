import { useState } from "react";
import { TextField } from "@mui/material";
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom'

const Auth = (props) => {
    const [cookies, setCookie, removeCookie] = useCookies(null)
    const [isLogIn, setIsLogIn] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [message, setMessage] = useState("");

    const viewLogin = (status) => {
        setMessage(null)
        setIsLogIn(status)
    }

    const navigate = useNavigate();
    const handleAction = async (e, endpoint) => {
        e.preventDefault()
        try {
            if (!isLogIn && password !== confirmPassword) {
                setMessage("Passwords do not match.");
                return;
            }
            const res = await fetch(`${process.env.REACT_APP_SERVERURL}/${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json()
            console.log(data)
            if (data.detail) { setMessage(data.detail) }
            else {
                setCookie('Email', data.email)
                setCookie('AuthToken', data.token)

                // Redirect to /goals/:user_id
                // const userId = data.user_id;
                navigate(`/`);

            }

        } catch (err) {
            setMessage("An error ocurred. Please try again.");
            console.error(err);
        }
    };
    return (
        <div className="create-goal">
            <button type="submit" variant="contained"
                onClick={() => viewLogin(false)}
                style={{ backgroundColor: !isLogIn ? '#0367a6' : 'rgb(188,188,188)' }}>
                Sign Up
            </button>
            <button type="submit" variant="contained"
                onClick={() => viewLogin(true)}
                style={{ backgroundColor: isLogIn ? '#0367a6' : 'rgb(188,188,188)' }}>
                Login
            </button>
            <form >
                <h2 className="create-title">{isLogIn ? (props.title) : (props.title)}</h2>
                <TextField
                    sx={{ m: 1 }}
                    id="user_email"
                    type="email"
                    label="Enter Email"
                    variant="outlined"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    sx={{ m: 1 }}
                    id="password"
                    type="password"
                    label="Enter password"
                    variant="outlined"
                    onChange={(e) => setPassword(e.target.value)}
                />
                {!isLogIn && <TextField
                    sx={{ m: 1 }}
                    id="confirmPassword"
                    type="password"
                    label="Confirm password"
                    variant="outlined"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />}
                <button type="submit" variant="contained" onClick={(e) => handleAction(e, isLogIn ? "login" : "signup")}>
                    Submit</button>
                <div>
                    {message && <p>{message}</p>}
                </div>
            </form>

        </div>

    );
};

export default Auth;