import ProjectItem from "./ProjectItem";
import './Components-style/ProjectsList.scss';
import { faker } from "@faker-js/faker";

export default function ProjectsList() {
    return (
        <section className="projects-list">
            <ProjectItem title='sample project #1' fullAmount={faker.number.int({ min: 100, max: 200 })} collectedAmount={faker.number.int({ min: 10, max: 100 })} image={faker.image.url()} />
            <ProjectItem title='sample project #2' fullAmount={faker.number.int({ min: 100, max: 200 })} collectedAmount={faker.number.int({ min: 10, max: 100 })} image={faker.image.url()} />
            <ProjectItem title='sample project #1' fullAmount={faker.number.int({ min: 100, max: 200 })} collectedAmount={faker.number.int({ min: 10, max: 100 })} image={faker.image.url()} />
            <ProjectItem title='sample project #2' fullAmount={faker.number.int({ min: 100, max: 200 })} collectedAmount={faker.number.int({ min: 10, max: 100 })} image={faker.image.url()} />
            <ProjectItem title='sample project #1' fullAmount={faker.number.int({ min: 100, max: 200 })} collectedAmount={faker.number.int({ min: 10, max: 100 })} image={faker.image.url()} />
            <ProjectItem title='sample project #2' fullAmount={faker.number.int({ min: 100, max: 200 })} collectedAmount={faker.number.int({ min: 10, max: 100 })} image={faker.image.url()} />
        </section>
    )
};