
export default function DailyOverview({ zipObj, curTemp }) {

    return (
        <div className="daily-overview">
            <div className="current-data-container">
                <p>Current Temperature<br />
                    <span className="measurement">
                        { curTemp ? curTemp : "58" }
                    <span className="unit">&deg;F</span></span>
                </p>
            </div>
            <div className="high-low-container">
                <p>Today's High: <span className="measurement">64<span className="unit">&deg;F</span></span></p>
                <p>Today's Low: <span className="measurement">48<span className="unit">&deg;F</span></span></p>
            </div>
        </div>
    )
}