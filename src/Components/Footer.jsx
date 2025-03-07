import './Components-style/Footer.scss';
import { NavLink } from 'react-router';

export default function Footer() {
    return (
        <footer>

            <div className="footer-content">
                <div>2025 GetFunded</div>
                <nav>
                    <NavLink to="/projects" end>DONATE</NavLink>
                </nav>

            </div>

        </footer>



    )
}