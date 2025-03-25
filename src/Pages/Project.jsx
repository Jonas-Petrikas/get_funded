import { useContext, useEffect } from "react";
import Data from "../Contexts/Data";
import { useParams } from "react-router";

export default function Project() {

    let { pid } = useParams();
    const { project, setProjectID } = useContext(Data);

    useEffect(_ => {
        setProjectID(pid);
        console.log(pid);
    }, [pid])

    console.log(project);

    const projectLoader = _ => {
        if (project === null || project.length === 0) {
            return <h1>Post is loading</h1>
        } else {
            return (
                <div className="project-container">
                    <div className="project-image-container">
                        <img src={project[0].image}></img>
                    </div>

                    <div className="project-details">
                        <div className="project-info">
                            <h1>{project[0].title}</h1>
                            <p>{project[0].content}</p>
                            <p>Funding progress: progress/goal</p>
                            <p>Progress bar</p>
                            <button>Donate now</button>
                        </div>

                        <div className="donations">
                            <h2>Recent donations: </h2>
                            <div>user donated x</div>
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