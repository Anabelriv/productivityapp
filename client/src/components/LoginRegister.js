import { useState } from "react";
import { useCookies } from 'react-cookie';
import { TextField } from "@mui/material";

const Auth = (props) => {
    const [cookies, setCookie] = useCookies(['Email']);
    console.log('Email from cookies:', cookies.Email);
    const [isLogIn, setIsLogIn] = useState(true)
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);

    const [error, setError] = useState(null);
    const viewLogin = (status) => {
        setError(null)
        setIsLogIn(status)
    }

    const handleSubmit = async (e, endpoint) => {
        e.preventDefault()
        try {
            if (!isLogIn && password !== confirmPassword) {
                setError("Passwords do not match.");
                return;
            }
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json()

            if (data.detail) { setError(data.detail) }
            else {
                setCookie('Email', data.email, { path: '/' }, { expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) })
                setCookie('AuthToken', data.token, { path: '/' })
                console.log('Cookies:', cookies);
                console.log("mycookies?:", email, data.token)
                window.location.href = "/goals/:user_id"
            }
            console.log("data", data)
            console.log("response:", response)
        } catch (err) {
            setError("An error ocurred. Please try again.");
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
                <button type="submit" variant="contained" onClick={(e) => handleSubmit(e, isLogIn ? "login" : "signup")}>
                    Submit</button>
                <div>
                    {error && <p>{error}</p>}
                </div>
            </form>

        </div>

    );
};

export default Auth;