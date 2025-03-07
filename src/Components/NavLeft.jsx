import { NavLink } from 'react-router'
import './Components-style/Nav.scss'

export default function NavLeft() {
    return (
        <nav>
            <a className='fundraise-btn' href="#">FUNDRAISE</a>
            <NavLink to="/projects" end>DONATE</NavLink>

            <a href="#"> Search</a>
        </nav>
    )
}