import { useState } from "react";


function CreateGoal() {
    const [title, setTitle] = useState();
    const [description, setDescription] = useState("");
    const [importance, setImportance] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [date, setDate] = useState("");

    const add = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/creategoal", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ title, description, importance, difficulty, date }),
            });
            const data = await res.json();
            console.log(data);
            // allProducts();
            setTitle(data);
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <><div className="result">
            <div className="create-goal">
                <h2 className="create-title">Create a new goal</h2>
                <form onSubmit={add}>
                    <div className="goal-box">
                        <input type="text" name="" required="" onChange={(e) => setTitle(e.target.value)} />
                        <label>Goal's Name</label>
                    </div>
                    <div className="goal-box">
                        <input type="text" name="" required="" onChange={(e) => setDescription(e.target.value)} />
                        <label>Description</label>
                    </div>
                    <div className="dropdown">
                        <label for="importance">How important is it?</label>
                        <select name="importance" id="importance" onChange={(e) => setImportance(e.target.value)}>
                            <option value="1">Critical</option>
                            <option value="2">Important</option>
                            <option value="3">Nice to have</option>
                        </select>
                    </div>
                    <span></span>
                    <div className="dropdown">
                        <label for="difficulty">How difficult is it?</label>
                        <select name="difficulty" id="difficulty" onChange={(e) => setDifficulty(e.target.value)}>
                            <option value="1">Easy</option>
                            <option value="2">Normal</option>
                            <option value="3">Hard</option>
                            <option value="4">Insane</option>
                        </select>
                    </div>
                    <div className="goals-date">
                        <label>When should I complete this?</label>
                        <input type="text" name="date" id="date" required pattern="\d{4}-\d{2}-\d{2}" onChange={(e) => setDate(e.target.value)} />
                    </div>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <input className="create" type="submit" value="Add Goal" />
                </form>
            </div>
        </div >
        </>
    );
}

export default CreateGoal;