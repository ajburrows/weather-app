
export default function DailyOverview({ current, max, min }) {

    return (
        <div className="daily-overview">
            <div className="current-data-container">
                <p>Current Temperature<br />
                    <span className="measurement">
                        { current ? Math.round(current) : "58" }
                    <span className="unit">&deg;F</span></span>
                </p>
            </div>
            <div className="high-low-container">
                <p>Today's High: <span className="measurement">
                    {max ? Math.round(max) : "64"}
                    <span className="unit">&deg;F</span></span>
                </p>

                <p>Today's Low: <span className="measurement">
                    {min ? Math.round(min) : "47"}
                    <span className="unit">&deg;F</span></span>
                </p>
            </div>
        </div>
    )
}