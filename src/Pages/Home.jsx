import { useEffect } from "react";
import DonationsLatestAllList from "../Components/Donations/DonationsLatestAllList";
import Hero from "../Components/Hero";
import ProjectsList from "../Components/Projects/ProjectsList";

export default function Home() {


    return (
        <>
            <Hero />
            <div className="bin">
                <div className="wrapper shadow">
                    <div className="hp-projects">
                        <div className="hp-projects-list-holder">
                            <h2>All projects:</h2>
                            <ProjectsList />
                        </div>
                        <div className="hp-projects-donations-holder">
                            <h2>Latest donations:</h2>
                            <DonationsLatestAllList />
                        </div>


                    </div>

                </div>
            </div>
        </>
    )
}