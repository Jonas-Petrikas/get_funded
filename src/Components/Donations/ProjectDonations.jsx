import '../Components-style/DonationsLatestAllItem.scss';

export default function ProjectDonations({ amount, date, userName, customName }) {


    return (



        <a>
            <div className='donation-item-card'>
                <div className='donation-item-texts'>
                    <div className='donation-item-date'> {date.split('T')[0]} </div>
                    <div>  <strong>{customName === null ? userName : customName}</strong> donated {amount.toString().slice(-9, -6) + ' ' + amount.toString().slice(-6, -3) + ' ' + amount.toString().slice(-3)} Eur</div>
                </div>
            </div>
        </a>
    )
};