import './Components-style/Header.scss';
import logo from '../assets/images/logo.svg';
import NavLeft from './NavLeft';
import NavRight from './NavRight';
import { NavLink, useLocation } from 'react-router';
import { HIDE_NAV_LIST } from '../Constants/main'

export default function Header() {
    const { pathname } = useLocation();

    if (HIDE_NAV_LIST.includes(pathname)) {
        return null;
    }
    return (
        <section className="header">
            <header>
                <div className="top-nav">
                    <NavLeft />
                    <div className="logo">
                        <NavLink to="/" end><img src={logo} alt="getFunded logo" /> </NavLink>
                    </div>
                    <NavRight />
                </div>

            </header>
        </section>


    )
}