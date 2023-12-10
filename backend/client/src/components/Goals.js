import ListHeader from "./ListHeader"
import ListItem from "./ListItem"
import LoginRegister from "./LoginRegister";
import { useState, useEffect, useContext } from "react";
import { useCookies } from "react-cookie";
import { AppContext } from "../App";

const Goals = () => {
    // const [cookies] = useCookies(null)
    //const authToken = cookies.AuthToken
    const user_email = "blue@test.com"
    //console.log("useremailcookies: ", user_email, "auth:", authToken)
    const { userInfo } = useContext(AppContext);
    const [goals, setGoals] = useState([]);

    const getData = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${user_email}`)
            const json = await response.json()
            setGoals(json)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getData()
    },// eslint-disable-next-line
        []
    )

    //Sort by date
    // const sortedGoals = goals?.sort((a, b) => new Date(a.date) - new Date(b.date))

    return (
        < div className="goals-list">
            {!authToken && <Auth />}
            {authToken &&
                <>
                    <ListHeader getData={getData} />
                    <p>Welcome {user_email}!</p>
                    {goals.map((goal) => <ListItem key={goal.goal_id} goal={goal} getData={getData} />)}
                </>}
        </div >

    );
};
export default Goals;