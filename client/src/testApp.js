import {
    useRef, useState
} from "react";

import "./App.css";
import axios from 'axios';

function App() {
    const input = useRef();
    const [name, setName] = useState();
    const storeCookie = async () => {
        try {
            const { data } = await axios.post('/new',
                { name: input.current.value }, { withCredentials: true })
        } catch (error) {
            console.log(error)
        }
    }
    const getCookie = async () => {
        try {
            const { data } = await axios.get('/name', { withCredentials: true });
            setName(data.message.name)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            bla
            <p>{name}</p>
            <button onClick={storeCookie}>store cookie</button>
            <button onClick={getCookie}>retrieve cookie</button>

        </div>
    )
}