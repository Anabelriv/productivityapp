import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
//
const Goal = (props) => {
    const [goal, setGoal] = useState([]);
    const [description, setDescription] = useState("");
    const [importance, setImportance] = useState("");
    const [time, setTime] = useState("");
    const param = useParams();
    const navigate = useNavigate()
    //
    console.log("param=>", param);

    useEffect(() => {
        getGoalInfo();
    }, []);

    const getGoalInfo = async () => {
        try {
            const res = await fetch(`/api/goals/${param.id}`);
            const data = await res.json();
            setGoal(data[0].goal);
            setDescription(data[0].description);
            setImportance(data[0].importance);
            setTime(data[0].time);
        } catch (e) {
            console.log(e);
        }
    };
    //
    const update = async (e) => {
        try {
            const res = await fetch(`/api/goals/${param.id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ description, importance, time }),
            });
            const data = await res.json();
            setGoal(data[0].goal);
            setDescription(data[0].description);
            setImportance(data[0].importance);
            setTime(data[0].time);
        } catch (e) {
            console.log(e);
        }
    };
    //

    const del = async () => {
        try {
            const res = await fetch(`/api/goals/${param.id}`, {
                method: "DELETE",
            });
            const data = await res.json();
            navigate('/')
        } catch (e) {
            console.log(e);
        }
    };
    //
    return (
        <div>
            <h1>Goal... {param.id}</h1>
            <div>
                <h2>Update Goal</h2>
                <form onSubmit={update}>
                    Description: <input value={description} onChange={(e) => setDescription(e.target.value)} />
                    Importance:{" "}
                    <input value={importance} onChange={(e) => setImportance(e.target.value)} />
                    Time: <input value={time} onChange={(e) => setTime(e.target.value)} />
                    <input type="submit" value="Update" />
                </form>
            </div>
            <div>
                <h2>Delete Goal</h2>
                <button onClick={del}>Delete</button>
            </div>
            {goal.map((item) => {
                return (
                    <div key={item.id}>
                        <h2>{item.description}</h2>
                        <h4>{item.importance}</h4>
                        <h4>{item.time}</h4>
                    </div>
                );
            })}
            <Link to="/">Back to Home</Link>
        </div>
    );
};
export default Goal;