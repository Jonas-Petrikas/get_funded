import { useContext, useEffect } from "react";
import Data from "../Contexts/Data";
import { useParams } from "react-router";
import ProgressBar from "../Components/Projects/ProgressBar";
import ProjectDonations from "../Components/Donations/ProjectDonations";

export default function Project() {

    let { pid } = useParams();
    console.log(pid);
    const { project, setProjectID, projectDonations, setDonationsAmount } = useContext(Data);
    console.log(projectDonations)

    let donationsCount = 3;


    useEffect(_ => {
        setProjectID(pid);
        setDonationsAmount(donationsCount)

        console.log(pid);

    }, [pid])

    const showAllDonations = e => {
        if (e.target.innerText === 'Show all') {
            donationsCount = 9999;
            setDonationsAmount(donationsCount);
            e.target.innerText = 'Show less';
        } else {
            donationsCount = 3;
            setDonationsAmount(donationsCount);
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
                            <button>Donate</button>
                            <h2>Recent Donators: </h2>

                            <div className="recent-donators-container">
                                <div className='project-donations-show-all' onClick={showAllDonations}>Show all</div>
                                {
                                    projectDonations.map(pd => (
                                        <ProjectDonations userName={pd.name} amount={pd.amount} date={pd.donated_at} />

                                    )

                                    )

                                }
                            </div>

                        </div>

                    </div>

                </div>

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