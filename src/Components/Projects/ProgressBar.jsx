import '../Components-style/ProgressBar.scss'

export default function ProgressBar({ fullAmount, collectedAmount }) {
    const progress = `${collectedAmount / fullAmount * 100}%`
    return (
        <div className="progress-bar-container">
            <div className="progress-bar">
                <div className='progress-bar-progress-amount'>
                    <span>Funding progress: </span>
                    <span className='numbers'>
                        <span>{collectedAmount.toString().slice(-9, -6) + ' ' + collectedAmount.toString().slice(-6, -3) + ' ' + collectedAmount.toString().slice(-3)} Eur </span>
                        /
                        <span> {fullAmount.toString().slice(-9, -6) + ' ' + fullAmount.toString().slice(-6, -3) + ' ' + fullAmount.toString().slice(-3)} Eur</span>


                    </span>
                </div>
                <div className="progress-bar-empty">
                    <div className="progress-bar-collected" style={{ width: progress }}>
                    </div>
                </div>
                <span className='progress-bar-percent'>{(parseInt(progress)).toFixed(0)}% of the goal reached</span>
            </div>
        </div>
    )
};