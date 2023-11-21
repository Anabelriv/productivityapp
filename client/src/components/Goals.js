import { useState, useEffect } from "react";
import TickIcon from "./TickIcon";
import Goal from "./Goal"
import Auth from "./LoginRegister";
import { useCookies } from "react-cookie";

const Goals = (props) => {
    const [cookies, setCookie, removeCookie] = useCookies(null)
    const authToken = cookies.AuthToken
    const userEmail = cookies.Email
    const [goals, setGoals] = useState(null);

    function ListHeader({ getData }) {
        const [cookies, setCookie, removeCookie] = useCookies(null)
        const [showModal, setShowModal] = useState(false)
        const signOut = () => {
            console.log('signout')
            removeCookie('Email')
            removeCookie('AuthToken')
            window.location.reload()
        }
        return (
            <div className="list-header">
                <h1> My Goals 🎯</h1>
                <div className="button-container">
                    <button className="create" onClick={() => setShowModal(true)}>Add New</button>
                    <button className="logout" onClick={signOut}>
                        Logout
                    </button>
                </div>
                {showModal && <Goal mode={'create'} setShowModal={setShowModal} getData={getData} />}
            </div>
        )
    }

    function ListItem({ goal, getData }) {
        const [showModal, setShowModal] = useState(false)
        const del = async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${goal.goal_id}`, {
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
                    {showModal && <Goal mode={'edit'} setShowModal={setShowModal} getData={getData} goal={goal} />}
                    <button className="delete" onClick={del}>Delete</button>
                </div>
            </li>)
    }
    const getData = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`)
            const json = await response.json()
            setGoals(json)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        if (authToken) { getData() }
    }, []
    )
    console.log(goals)

    //Sort by date
    const sortedGoals = goals?.sort((a, b) => new Date(a.date) - new Date(b.date))

    return (
        < div className="goals-list">
            {!authToken && <Auth />}
            {authToken &&
                <><ListHeader getData={getData} />
                    {sortedGoals?.map((goal) => <ListItem key={goal.goal_id} getData={getData} goal={goal} />)}
                </>}
        </div >

    );
};
export default Goals;