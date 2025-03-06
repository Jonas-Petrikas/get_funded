import './Components-style/Header.css';
import logo from '../assets/images/logo.svg';

export default function Header() {
    return (
        <section className="header">
            <header>

                <nav>
                    <a className='fundraise-btn' href="#">FUNDRAISE</a>
                    <a href="#">DONATE</a>
                    <a href="#"> Search</a>


                </nav>

                <div className="logo">
                    <img src={logo} alt="getFunded logo" />
                </div>
                <nav>

                    <a href="#">ABOUT</a>
                    <a href="#">CONTACTS</a>
                    <a href="#">USER MENU</a>
                </nav>
            </header>

        </section>


    )
}