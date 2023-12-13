import ListHeader from "./ListHeader"
import ListItem from "./ListItem"
import LoginRegister from "./LoginRegister";
import { useState, useEffect, useContext } from "react";
import { useCookies } from "react-cookie";
import { Auth } from "../auth/Auth";



const Goals = () => {
    const [cookies] = useCookies(null)
    const authToken = cookies.token
    const userEmail = cookies.userEmail
    console.log("useremailcookies: ", userEmail, "auth:", authToken)

    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getData = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`)
            console.log(response)
            if (!response.ok) {
                throw new Error(`Failed to fetch data: ${response.statusText}`);
            }
            const json = await response.json()
            setGoals(json)
        } catch (err) {
            console.error(err);
            setError('Failed to fetch goals. Please try again')
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getData()
    },// eslint-disable-next-line
        []
    )

    return (
        < div className="goals-list">
            {/* {!authToken && <Auth />}
            {authToken && ( */}
            <>
                <ListHeader getData={getData} />
                <p>Welcome {userEmail}!</p>
                {loading && <p>Loading goals...</p>}
                {error && <p>{error}</p>}
                {!loading && !error && goals.map((goal) => <ListItem key={goal.goal_id} goal={goal} getData={getData} />)}
            </>
            {/* )} */}
        </div >

    );
};
export default Goals;