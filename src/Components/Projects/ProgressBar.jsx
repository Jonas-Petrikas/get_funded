import '../Components-style/ProgressBar.scss'

export default function ProgressBar({ fullAmount, collectedAmount }) {
    const progress = `${collectedAmount / fullAmount * 100}%`
    return (
        <div className="progress-bar-container">
            <div className="progress-bar">
                <div className="progress-bar-empty">
                    <div className="progress-bar-collected" style={{ width: progress }}>

                    </div>


                </div>
            </div>
        </div>
    )
};