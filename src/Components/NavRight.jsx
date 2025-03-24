import { NavLink } from 'react-router'
import './Components-style/Nav.scss'
import { useContext, useState } from 'react';
import Auth from '../Contexts/Auth';
import UserNavMenu from './UserNavMenu';

export default function NavRight() {

    const [showMenuModal, setShowMenuModal] = useState('none');

    const changeModalVis = _ => {
        setShowMenuModal(s => {
            return s === 'none' ? s = 'flex' : s = 'none';
        })
    }

    const { user } = useContext(Auth);

    return (
        <nav className='nav-right'>
            <NavLink to='/about' end>ABOUT</NavLink>
            <NavLink to='/contacts' end>CONTACTS</NavLink>
            {
                user.role !== 'guest' || !user ? <div className='user-menu-button' onClick={changeModalVis} >User menu<UserNavMenu style={{ display: showMenuModal }} /></div> : <NavLink to='/login' end> Login</NavLink>
            }
        </nav>
    )
}