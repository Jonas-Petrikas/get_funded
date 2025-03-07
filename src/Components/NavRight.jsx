import { NavLink } from 'react-router'
import './Components-style/Nav.scss'

export default function NavRight() {
    return (
        <nav>
            <NavLink to='/about' end>ABOUT</NavLink>
            <NavLink to='/contacts' end>CONTACTS</NavLink>
            <a href="#"> User menu</a>
        </nav>
    )
}