import '../Components-style/DonationsLatestAllItem.scss';
import ProgressBar from '../Projects/ProgressBar.jsx';
import { NavLink } from 'react-router';

export default function DonationsLatestAllItem({ projectId, amount, date, userName, projectTitle, fullAmount, collectedAmount, customName }) {
    return (


        <NavLink to={'project/' + projectId} end>
            <div className='donation-item-card'>
                <div className='donation-item-texts'>
                    <div className='donation-item-date'> {date.split('T')[0]}</div>
                    <div> <strong>{customName === null ? userName : customName}</strong> donated {amount.toString().slice(-9, -6) + ' ' + amount.toString().slice(-6, -3) + ' ' + amount.toString().slice(-3)} Eur</div>
                    <div>towards: <strong>{projectTitle}</strong></div>
                </div>
                <div className='project donation-progress-bar'><ProgressBar fullAmount={fullAmount} collectedAmount={collectedAmount}></ProgressBar></div>
            </div>
        </NavLink>
    )
};