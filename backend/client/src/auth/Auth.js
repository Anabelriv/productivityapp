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
                const res = await axios.get(`${process.env.REACT_APP_SERVERURL}/verify`, { withCredentials: true });
                // If the request is successful, the cookie should be automatically stored by the browser

                if (res.status === 200) {
                    setRedirect(true);
                }
                console.log(res)
            } catch (err) {
                // Clear token
                console.error(err)
                setToken(null);
                navigate("/login");
            }
        };
        verify();
    }, [token, setToken, navigate]);

    return redirect ? props.children : null;
};