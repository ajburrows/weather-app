
export default function CurrentData({ zipObj, curTemp }) {

    return (
        <div className="current-data-container">
            <p>Current Temperature:<br /><span>{ curTemp ? curTemp : "58" }<span>&deg;F</span></span></p>
        </div>
    )
}