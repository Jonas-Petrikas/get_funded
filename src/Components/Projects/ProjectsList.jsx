import ProjectItem from "./ProjectItem";
import '../Components-style/ProjectsList.scss';
import { useContext, useEffect } from "react";
import Data from "../../Contexts/Data";

export default function ProjectsList() {

    const { projects, frontProjects, newProjectID, setNeedUpdate } = useContext(Data);

    useEffect(_ => {
        if (frontProjects === null) {
            return
        }
        console.log('frontProjects', frontProjects)

    }, [frontProjects])



    useEffect(_ => {
        console.log('užsikrovė')
        setNeedUpdate(1)



    }, [])


    if (projects === null) {
        return (
            <div className="bin wrapper">
                <h1>Project loading...</h1>
            </div>
        );
    }



    return (
        <section className="projects-list">
            <>
                {
                    projects.map(p => <ProjectItem key={p.id} id={p.id} title={p.title} content={p.content} fullAmount={p.amount_goal} collectedAmount={p.amount_collected} image={p.image} />)

                }
            </>


        </section>
    )
};