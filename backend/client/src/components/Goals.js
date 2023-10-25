import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../App";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Goals = (props) => {
    //
    const [goals, setGoals] = useState();
    const [search, setSearch] = useState("");
    const [description, setDescription] = useState("");
    const [importance, setImportance] = useState("");
    const [time, setTime] = useState("");
    const { token } = useContext(AppContext);
    //
    useEffect(() => {
        console.log("home=>", token);
        allGoals();
    }, []);
    //
    const allGoals = async () => {
        try {
            const res = await fetch(`/api/goals`);
            const data = await res.json();
            // if (res.status !== 200) {
            //   console.log(data);
            // } else {
            //   setProducts(data);
            // }

            setGoals(data);
        } catch (e) {
            console.log(e);
        }
    };
    //
    const handleSearch = async () => {
        try {
            const res = await fetch(`${BASE_URL}/api/goals/search?description=${search}`);
            const data = await res.json();
            data && setGoals(data);
        } catch (e) {
            console.log(e);
        }
    };
    //
    const add = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/goals", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ description, importance, time }),
            });
            const data = await res.json();
            console.log(data);
            // allProducts();
            setGoals(data);
        } catch (e) {
            console.log(e);
        }
    };
    //
    return (
        <>
            <h1>My Goals</h1>
            <div>
                <input onChange={(e) => setSearch(e.target.value)} />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div>
                <form onSubmit={add}>
                    Goal:
                    <input onChange={(e) => setGoals(e.target.value)} />
                    Description:
                    <input onChange={(e) => setDescription(e.target.value)} />
                    Importance:
                    <input onChange={(e) => setImportance(e.target.value)} />
                    Time:
                    <input onChange={(e) => setTime(e.target.value)} />
                    <input type="submit" value="Add goal" />
                </form>
            </div>
            {goals &&
                goals.map((item) => {
                    return (
                        <div
                            key={item.id}
                            style={{
                                display: "inline-block",
                                margin: "20px",
                                padding: "20px",
                                border: "1px solid #000",
                            }}>
                            <h4>{item.name}</h4>
                            <p>{item.price}</p>
                            <Link to={`/goal/${item.id}`}>Completed</Link>
                        </div>
                    );
                })}
        </>
    );
};
export default Goals;