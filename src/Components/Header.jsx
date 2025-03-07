import './Components-style/Header.scss';
import logo from '../assets/images/logo.svg';
import NavLeft from './NavLeft';
import NavRight from './NavRight';
import { NavLink } from 'react-router';

export default function Header() {
    return (
        <section className="header">
            <header>
                <NavLeft />
                <div className="logo">
                    <NavLink to="/" end><img src={logo} alt="getFunded logo" /> </NavLink>
                </div>
                <NavRight />
            </header>
        </section>


    )
}