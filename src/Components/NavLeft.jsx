import { NavLink } from 'react-router'
import './Components-style/Nav.scss'

export default function NavLeft() {
    return (
        <nav>
            <NavLink className='fundraise-btn' to="/create" end>FUNDRAISE</NavLink>
            <NavLink to="/projects" end>DONATE</NavLink>

            <a href="#"> Search</a>
        </nav>
    )
}