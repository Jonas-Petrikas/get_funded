import '../Components-style/DonationsLatestAllItem.scss';
// import ProgressBar from '../Projects/ProgressBar';
import * as C from '../../Constants/main.js';
import ProgressBar from '../Projects/ProgressBar.jsx';

export default function DonationsLatestAllItem({ projectId, amount, date, userName, projectTitle, fullAmount, collectedAmount }) {
    return (


        <a href={C.PUBLIC_URL + ':' + projectId}>
            <div className='donation-item-card'>
                <div> [ {date.split('T')[0]} ] <strong>{userName}</strong> donated {amount} Eur towards: <strong>{projectTitle}</strong></div><div className='donation-progress-bar'><ProgressBar fullAmount={fullAmount} collectedAmount={collectedAmount} /></div>
            </div>
        </a>
    )
};