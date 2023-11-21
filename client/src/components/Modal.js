import { useState } from 'react'
const Modal = () => {
    const mode = 'create'
    const editMode = mode === 'edit' ? true : false
    const [data, setData] = useState({
        user_email: "",
        title: "",
        progress: "",
        date: ""
    })


    const handleChange = (e) => {
        console.log('Handlechange', e)
        const { name, value } = e.target
        setData(data => ({
            ...data,
            [name]: value
        }))
    }
    return (
        <div className="overlay">
            <div className="modal">
                <div className="button-container">
                    <form className="update" onSubmit={update}>
                        <div className="form-title-container">
                            <h2>Let's {mode} your goal</h2>
                        </div>
                        <div className="goal-box">
                            <label style={{ 'position': 'relative' }}>Title</label>
                            <span></span>
                            <input type="text" name="title" required maxLength={30} value={data.title} onChange={handleChange} />
                        </div>
                        <div className="goal-box">
                            <label style={{ 'position': 'relative' }}>Description</label>
                            <span></span>
                            <input type="text" name="descritpion" required="" onChange={(e) => setDescription(e.target.value)} />
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
                            <input type="date" onChange={(e) => setDate(e.target.value)} />
                        </div>
                        <span></span>
                        <span></span>
                        <input className="edit" type="submit" value="Update" />
                    </form>

                </div>
                <div></div>
            </div>
        </div>
    )
}

export default Modal;