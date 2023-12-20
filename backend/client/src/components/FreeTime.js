
import Result from "./Result";
import { useState } from 'react';
import { useCookies } from "react-cookie";

function FreeTime() {
    const [seen, setSeen] = useState(false)
    const [selectedGoal, setSelectedGoal] = useState(null);
    const [selectedTime, setSelectedTime] = useState('');
    const [cookies] = useCookies(['Email', 'AuthToken']);
    const userEmail = cookies.userEmail
    function togglePop() {
        setSeen(!seen);
    }


    const handleOptimizeFreeTime = async (time) => {
        console.log('Cookies:', cookies);
        if (!userEmail) {
            console.error("User email is undefined.");
            return;
        }
        // Set the selected time in the state
        setSelectedTime(time);

        try {
            const response = await fetch(`/free-time/${cookies.userEmail}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ freeTime: selectedTime }),
            });
            console.log('Selected Time:', selectedTime);
            const result = await response.json();
            setSelectedGoal(result); // Set the selected goal
            togglePop(); // Show the Result component

            console.log('Selected Goal:', selectedGoal);
        } catch (error) {
            console.error("error fetching and setting selected goal:", error)
        }

    };

    // Call handleOptimizeFreeTime with the selected time when the button is clicked
    <button onClick={() => handleOptimizeFreeTime(selectedTime)}>Tell me!</button>
    return (
        <div>
            <div className="FreeTime">
                <h1>Free time right now?</h1>
                <p>Select one option and we will tell you on which goal to work on</p>
                <label >
                    <span className="TimeText" >15 minutes</span>
                    <input className="l" type="radio" name="check" onChange={() => setSelectedTime('15')} />
                </label>
                <label>
                    <span className="TimeText">30 minutes</span>
                    <input className="l" type="radio" name="check" onChange={() => setSelectedTime('30')} />
                </label>
                <label >
                    <span className="TimeText">60 minutes or more</span>
                    <input className="l" type="radio" name="check" onChange={() => setSelectedTime('60')} />
                </label>
                <button onClick={() => handleOptimizeFreeTime(selectedTime)}>Tell me!</button>
                {seen ? <Result selectedGoal={selectedGoal} /> : null}
            </div>
        </div>
    )
}


export default FreeTime;




