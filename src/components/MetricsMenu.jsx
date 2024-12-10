import { Link } from "react-router-dom"

export default function MetricsMenu() {

    return(
        <div className="metrics-menu-container">
            <h2>Metrics</h2>
            <Link to="/temperature"><span>Temperature</span></Link>
            <Link to="/temperature"><span>Temperature</span></Link>
            <Link to="/temperature"><span>Temperature</span></Link>
            <Link to="/temperature"><span>Temperature</span></Link>
        </div>
    )
}