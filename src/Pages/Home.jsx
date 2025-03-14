import DonationsLatestAllList from "../Components/Donations/DonationsLatestAllList";
import Hero from "../Components/Hero";

export default function Home() {
    return (
        <>
            <Hero />
            <div className="bin">
                <div className="wrapper shadow">
                    <h2>Latest donations:</h2>
                    <DonationsLatestAllList />
                </div>
            </div>
        </>
    )
}