import { useContext, useEffect, useState } from "react";
import Data from "../Contexts/Data";
import { useParams } from "react-router";
import ProgressBar from "../Components/Projects/ProgressBar";
import ProjectDonations from "../Components/Donations/ProjectDonations";
import DonateModal from "../Components/DonateModal";

export default function Project() {
    let { pid } = useParams();

    const { project, setProjectID, projectDonations, setDonationsAmount } = useContext(Data);
    const [donateModal, setDonateModal] = useState(false);
    const showDonateModal = () => setDonateModal(!donateModal);

    useEffect(_ => {
        setProjectID(pid);
        setDonationsAmount(3);
        // setDonateModal(false);
        console.log('užsikrove')


    }, [pid, setProjectID, setDonationsAmount]);



    const showAllDonations = e => {
        if (e.target.innerText === 'Show all') {
            setDonationsAmount(99999);
            e.target.innerText = 'Show less';
        } else {
            setDonationsAmount(3);
            e.target.innerText = 'Show all';
        }


    }



    const projectLoader = _ => {

        if (project === null || project.length === 0) {
            return <h1>Post is loading</h1>
        } else {
            const fullAmount = project[0].amount_goal;
            const collectedAmount = project[0].amount_collected;
            return (
                <>
                    <div className="project-container">
                        <div className="project-image-container">
                            <img src={project[0].image}></img>
                        </div>

                        <div className="project-details">
                            <div className="project-info">

                                <h1>{project[0].title}</h1>
                                <p> Started by: <strong>{project[0].user_name}</strong></p>
                                <p>{project[0].content}</p>
                            </div>

                            <div className="donations">
                                <h2>Donations: </h2>
                                <ProgressBar fullAmount={fullAmount} collectedAmount={collectedAmount} />
                                <button onClick={showDonateModal}>Donate</button>

                                <h2>Recent Donators: </h2>
                                {
                                    projectDonations === null ? <h2>Donations are loading</h2> :

                                        <div className="recent-donators-container">
                                            <div className='project-donations-show-all' onClick={showAllDonations}>Show all</div>
                                            {
                                                projectDonations.map(pd => (
                                                    <ProjectDonations key={pd.id} userName={pd.name} customName={pd.custom_name} amount={pd.amount} date={pd.donated_at} />

                                                )

                                                )

                                            }
                                        </div>
                                }
                            </div>

                        </div>

                    </div>{
                        donateModal &&
                        <DonateModal showDonateModal={showDonateModal} pid={pid} />
                    }

                </>


            )

        }

    }



    return (
        <>



            <div className="bin">
                <div className="wrapper shadow">

                    {projectLoader()}


                </div>

            </div >


        </>
    )
}