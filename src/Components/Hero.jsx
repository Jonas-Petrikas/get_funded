import { NavLink } from 'react-router';
import './Components-style/Hero.scss';


export default function Hero() {
    return (
        <section className="hero">
            <div className="header-bin wrapper">
                <h1>
                    Filler Hero text
                </h1>
                <p>Filler hero paragraph</p>
                <NavLink to='/create' end><button>start your fundraiser</button></NavLink>
            </div>

        </section>


    )
}