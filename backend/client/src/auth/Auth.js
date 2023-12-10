import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../App";

export const Auth = (props) => {
    const [redirect, setRedirect] = useState(null);
    const { token, setToken } = useContext(AppContext);
    console.log(setToken);
    const navigate = useNavigate();

    useEffect(() => {
        const verify = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_SERVERURL}/verify`, {
                    data: {
                        "token": token?.token,
                    },
                });
                //if pass then store the token and user_email
                if (res.status === 200) {
                    localStorage.setItem("token", token?.token);
                    localStorage.setItem("user_email", res.data.user_email);
                    setRedirect(true);
                }
            } catch (err) {
                // Clear token and user_email from localStorage on error
                localStorage.removeItem("token");
                localStorage.removeItem("user_email");
                setToken(null);
                navigate("/login");
            }
        };
        verify();
    }, [token, setToken, navigate]);

    return redirect ? props.children : null;
};