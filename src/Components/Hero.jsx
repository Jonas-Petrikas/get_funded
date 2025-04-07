import { NavLink } from 'react-router';
import './Components-style/Hero.scss';
import hero from '../../src/assets/images/hero.png';


export default function Hero() {
    return (
        <section className="hero">
            <div className="header-bin wrapper">
                <h1>
                    Make a Difference Today!
                </h1>
                <p>
                    Start your fundraiser and rally your community <br /> to support  what matters most.</p>
                <NavLink to='/create' end><button>start your fundraiser</button></NavLink>
            </div>

        </section>


    )
}