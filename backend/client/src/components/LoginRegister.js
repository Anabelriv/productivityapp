//new things
import { AppContext } from "../App";
import Link from '@mui/material/Link';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';
//old version
import { useState, useContext, useEffect } from "react";
import { TextField } from "@mui/material";
import { cookies, useCookies } from "react-cookie";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                SMART Productivity App
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


//old version
const LoginRegister = (props) => {
    const [isLogIn, setIsLogIn] = useState(true)
    const [user_email, setUserEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);

    const [error, setError] = useState(null);
    const { setToken, setCookies } = useContext(AppContext);
    const [cookies, setCookie, removeCookie] = useCookies(null) //new
    const navigate = useNavigate()
    console.log("reactcookies", cookies) //new
    const viewLogin = (status) => {
        setError(null)
        setIsLogIn(status)
    }

    const handleSubmit = async (e, endpoint) => {
        e.preventDefault();
        try {
            if (!isLogIn && password !== confirmPassword) {
                setError("Passwords do not match.");
                return;
            }
            const res = await axios.post(`/${endpoint}`, {
                user_email,
                password,
            })
            console.log(res)
            if (res.status >= 200 && res.status < 300) {
                setError("");
                setToken(res.data.token);
                const userEmail = res.data.user_email;

                setUserEmail(res.data.user_email);
                setCookies(res.data.token, res.data.userEmail); //changed to setCookie instead of setCookies
                setCookie(res.data.token, res.data.userEmail); //from tutorial

                console.log(userEmail);
                navigate(`/goals/${cookies.userEmail}`);//not working why?!!! 
            }
        } catch (err) {
            setError(err.response.data.msg);
            console.error(err);
        }
    };
    return (
        <div style={{ background: 'linear-gradient(90deg, #485563 10%, #274c77 90%)' }}>
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
                        onChange={(e) => setUserEmail(e.target.value)}
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
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </div>

        </div>
    );
};

export default LoginRegister;