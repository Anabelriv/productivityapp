import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

//
const Goal = ({ mode, setShowModal, getData, goal }) => {
    const [cookies, setCookie, removeCookie] = useCookies(null)
    const editMode = mode === 'edit';
    const [data, setData] = useState({
        user_email: editMode ? goal.user_email : cookies.user_email,
        title: editMode ? goal.title : '',
        description: editMode ? goal.description : '',
        date: editMode ? goal.date : '',
        id_importance: editMode ? goal.id_importance : '',
        difficulty: editMode ? goal.difficulty : ''
    });
    const param = useParams();
    const navigate = useNavigate()

    //post data

    const postData = async (e) => {
        e.preventDefault();
        try {
            const formattedDate = new Date(data.date).toISOString().split('T')[0];

            const postData = {
                user_email: data.user_email,
                title: data.title,
                description: data.description,
                date: formattedDate,
                id_importance: data.id_importance,
                difficulty: data.difficulty
            };

            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(postData)
            })
            if (response.ok) {
                console.log('worked')
                setShowModal(false)
                getData()
            }
        } catch (err) {
            console.error(err)
        }
    }


    //
    const handleChange = (e) => {
        console.log('Handlechange', e)
        const { name, value } = e.target
        setData(data => ({
            ...data,
            [name]: value
        }))
    }
    console.log("param=>", param);


    const getGoalInfo = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${param.id}`);
            if (res.ok) {
                const fetchedData = await res.json();
                if (Array.isArray(fetchedData) && fetchedData.length > 0) {
                    setData(fetchedData[0]);
                } else {
                    console.log("fetched data is not as expected:", fetchedData);
                }
            } else {
                console.log("Error fetching goal:", res.status);
            }
        } catch (e) {
            console.error("Error fetching goal:", e);
        }
    };

    //edit data
    const update = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${goal.goal_id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const updatedData = await res.json();
            setData(updatedData[0]);
            if (res.status === 200) {
                setShowModal(false)
                getData()
            }
        } catch (e) {
            console.log(e);
        }
    };
    //



    useEffect(() => {
        getGoalInfo();
        // eslint-disable-next-line 
    }, []);

    //

    const del = async () => {
        try {
            console.log('Delete button clicked');
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
        <div className="result">
            <div className="create-goal">
                <h1 className="goal-title">{data?.title} {param.id}</h1>
                <span></span>
                <div className="button-container">
                    <div className="form-title-container">
                        <h2>Let's {mode} your goal</h2>
                        <button className="cancel" onClick={() => setShowModal(false)}>Cancel</button>
                    </div>
                    {/* <form className="update" onSubmit={postData}> */}
                    <form className="update">

                        <div className="goal-box">
                            <label style={{ 'position': 'relative' }}>Title</label>
                            <span></span>
                            <input type="text" name="title" required maxLength={30} value={data.title} onChange={handleChange} />
                        </div>
                        <div className="goal-box">
                            <label style={{ 'position': 'relative' }}>Description</label>
                            <span></span>
                            <input type="text" name="description" required value={data.description} onChange={handleChange} />
                        </div>
                        <div className="dropdown">
                            <label htmlFor="id_importance">How important is it?</label>
                            <select name="id_importance" id="id_importance" required value={data.id_importance} onChange={handleChange}>
                                <option value="1">Critical</option>
                                <option value="2">Important</option>
                                <option value="3">Nice to have</option>
                            </select>
                        </div>
                        <span></span>

                        <div className="dropdown">
                            <label htmlFor="difficulty">How difficult is it?</label>
                            <select name="difficulty" id="difficulty" required value={data.difficulty} onChange={handleChange}>
                                <option value="1">Easy</option>
                                <option value="2">Normal</option>
                                <option value="3">Hard</option>
                                <option value="4">Insane</option>
                            </select>
                        </div>
                        <div className="goals-date">
                            <label>When should I complete this?</label>
                            <input placeholder="YYYY-MM-DD" type="date" name="date" id="date" required value={data.date} onChange={handleChange} />
                        </div>
                        <span></span>
                        <span></span>
                        <input className="create" type="submit" value={mode} onClick={editMode ? update : postData} />
                        <button className='delete' onClick={del}>Delete</button>
                    </form>
                </div>
                <Link to="/">Back Home</Link>
            </div>
        </div>
    );
};
export default Goal;
