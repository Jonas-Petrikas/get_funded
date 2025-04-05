import ProjectItem from "./ProjectItem";
import '../Components-style/ProjectsList.scss';
import { useContext, useEffect } from "react";
import Data from "../../Contexts/Data";

export default function ProjectsList() {

    const { projects, frontProjects } = useContext(Data);
    console.log('frontProjects', frontProjects)
    useEffect(_ => {
        if (frontProjects === null) {
            return
        }
        console.log('frontProjects', frontProjects)

    }, [frontProjects])


    if (projects === null) {
        return (
            <div className="bin wrapper">
                <h1>įrašai įkeliami...</h1>
            </div>
        );
    }
    console.log(frontProjects);


    return (
        <section className="projects-list">
            <>
                {
                    frontProjects !== null ? <ProjectItem id={frontProjects.id} title={frontProjects.title} content={frontProjects.content} fullAmount={frontProjects.amountGoal} collectedAmount={0} image={frontProjects.image.src} /> : ''
                }
                {
                    projects.map(p => <ProjectItem key={p.id} id={p.id} title={p.title} content={p.content} fullAmount={p.amount_goal} collectedAmount={p.amount_collected} image={p.image} />)

                }
            </>


        </section>
    )
};