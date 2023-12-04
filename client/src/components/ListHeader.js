import GoalActions from "./Goal"
import { useState } from "react"
import { useCookies } from "react-cookie"


function ListHeader({ getData }) {
    const [cookies, setCookie, removeCookie] = useCookies(null)
    const [showModal, setShowModal] = useState(false)

    const signOut = (e) => {
        e.preventDefault();
        console.log('signout');
        removeCookie('Email', { path: "/" })
        removeCookie('AuthToken', { path: "/" })
        window.location.href = '/login';
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
            {showModal && <GoalActions mode={'create'} setShowModal={setShowModal} getData={getData} />}
        </div>
    )
}

export default ListHeader;