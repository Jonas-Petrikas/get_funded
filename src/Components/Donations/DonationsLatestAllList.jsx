
import '../Components-style/DonationsLatestAllList.scss';
import { useContext, useEffect } from "react";
import Data from "../../Contexts/Data.jsx";
import LatestAllItem from './DonationsLatestAllItem.jsx';
import ProgressBar from '../Projects/ProgressBar.jsx';

export default function DonationsLatestAllList() {

    const { donations, setUpdateDonations } = useContext(Data);


    useEffect(_ => {
        setUpdateDonations(1)
    }, [])






    if (donations === null) {
        return (
            <div className="donations-list bin wrapper">
                <h1>donation list is loading...</h1>
            </div>
        );
    }



    return (
        <section className="donations-list">
            {
                donations.map(d => <LatestAllItem key={d.id} projectId={d.project_id} amount={d.amount} date={d.donated_at} userName={d.name} customName={d.custom_name} projectTitle={d.title} collectedAmount={d.amount_collected} fullAmount={d.amount_goal} />)
                // 





            }


        </section>
    )
};