import { useContext } from "react";
import Auth from "../Contexts/Auth";
import { NavLink } from "react-router";


export default function UserNavMenu({ style, changeModalVis, showMenuModal }) {

    const { user } = useContext(Auth);

    return (<>

        <div className="modal-bg" onClick={changeModalVis} style={{ display: showMenuModal }}>
        </div>

        <div className="user-nav-menu-modal" style={style}>

            <div className="user-nav-menu-modal-items">
                <h2>Hi, <i>{user.name}!</i></h2>
                <p>[{user.role}]</p>
                {
                    user.role === 'admin' ? <NavLink to='/admin/main' end><span className="admin-btn">ADMIN DASH 🚀</span></NavLink> : ''
                }
                <NavLink to='/create' end>New fundraiser</NavLink>
                <NavLink to='/' end>My projects</NavLink>
                <NavLink to='/' end>Donations</NavLink>
                <NavLink to='/' end>User profile</NavLink>
                <div className="logout"><NavLink to='/logout' end>Logout</NavLink></div>

            </div>

        </div >
    </>
    )
}