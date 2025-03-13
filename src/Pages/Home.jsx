import DonationsLatestAllList from "../Components/Donations/DonationsLatestAllList";

export default function Home() {
    return (
        <>
            <div className="bin">
                <div className="wrapper shadow">
                    <h1>Latest donations:</h1>
                    <DonationsLatestAllList />
                </div>
            </div>
        </>
    )
}