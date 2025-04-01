import ProjectItem from "./ProjectItem";
import '../Components-style/ProjectsList.scss';
import { useContext } from "react";
import Data from "../../Contexts/Data";

export default function ProjectsList() {

    const { projects } = useContext(Data);



    if (projects === null) {
        return (
            <div className="bin wrapper">
                <h1>įrašai įkeliami...</h1>
            </div>
        );
    }



    return (
        <section className="projects-list">
            {
                projects.map(p => <ProjectItem key={p.id} id={p.id} title={p.title} fullAmount={p.amount_goal} collectedAmount={p.amount_collected} image={p.image} />)
            }


        </section>
    )
};