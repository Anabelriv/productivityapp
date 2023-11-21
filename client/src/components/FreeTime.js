
import Result from "./Result";
import { useState } from 'react';

function FreeTime() {
    const [seen, setSeen] = useState(false)

    function togglePop() {
        setSeen(!seen);
    }

    return (
        <div>
            <div className="FreeTime">
                <h1>Free time right now?</h1>
                <p>Select one option and we will tell you on which goal to work on</p>
                <label >
                    <span className="TimeText" >15 minutes</span>
                    <input className="l" type="radio" name="check" />
                </label>
                <label>
                    <span className="TimeText">30 minutes</span>
                    <input className="l" type="radio" name="check" />
                </label>
                <label >
                    <span className="TimeText">60 minutes or more</span>
                    <input className="l" type="radio" name="check" />
                </label>
                <button onClick={togglePop}>Tell me!</button>
                {seen ? <Result toggle={togglePop} /> : null}
            </div>
        </div>
    )
}

export default FreeTime;