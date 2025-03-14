import '../Components-style/DonationsLatestAllItem.scss';
// import ProgressBar from '../Projects/ProgressBar';
import * as C from '../../Constants/main.js';
import ProgressBar from '../Projects/ProgressBar.jsx';

export default function DonationsLatestAllItem({ projectId, amount, date, userName, projectTitle, fullAmount, collectedAmount }) {
    return (


        <a href={C.PUBLIC_URL + 'project/:' + projectId}>
            <div className='donation-item-card'>
                <div className='donation-item-texts'>
                    <div> [ {date.split('T')[0]} ]</div>
                    <div>  <strong>{userName}</strong> donated {amount.toString().slice(-9, -6) + ' ' + amount.toString().slice(-6, -3) + ' ' + amount.toString().slice(-3)} Eur</div>
                    <div>towards: <strong>{projectTitle}</strong></div>
                </div>
                <div className='donation-progress-bar'><ProgressBar fullAmount={fullAmount} collectedAmount={collectedAmount}></ProgressBar></div>
            </div>
        </a>
    )
};