import TickIcon from "./TickIcon";
import { useState } from "react";
import GoalActions from "./Goal";


function ListItem({ goal, getData }) {
    const [showModal, setShowModal] = useState(false)

    const del = async () => {
        try {
            const res = await fetch(`/todos/${goal.goal_id}`, {
                method: "DELETE",
            });
            if (res.status === 200) {
                console.log('Deleted successfully');
                getData()
            }
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <li className="list-item">

            <div className="info-container">
                <TickIcon />
                <p className="goal-list-title">{goal.title}</p>
            </div>
            <div className="button-container">
                <button onClick={() => setShowModal(true)} className="edit">Edit</button>
                {showModal && <GoalActions mode={'edit'} setShowModal={setShowModal} getData={getData} goal={goal} />}
                <button className="delete" onClick={del}>Delete</button>
            </div>
        </li>)
}

export default ListItem;