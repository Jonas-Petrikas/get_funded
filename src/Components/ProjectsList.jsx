import ProjectItem from "./ProjectItem";
import './Components-style/ProjectsList.scss';
import { faker } from "@faker-js/faker";
import { useContext } from "react";
import Data from "../Contexts/Data";

export default function ProjectsList() {

    const { projects } = useContext(Data)
    if (projects === null) {
        return (
            <div className="bin wrapper">
                <h1>įrašai įkeliami...</h1>
            </div>
        );
    }

    return (
        <section className="projects-list">
            <ProjectItem title='sample project #1' fullAmount={faker.number.int({ min: 100, max: 200 })} collectedAmount={faker.number.int({ min: 10, max: 100 })} image={faker.image.url()} />
        </section>
    )
};