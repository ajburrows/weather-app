import { Link } from "react-router-dom"

export default function MetricsMenu({ zipCode }) {

    return(
        <div className="metrics-menu-container">
            <h2>Metrics</h2>
            <Link to={`/${zipCode}/temperature`}><span>Temperature</span></Link>
            <Link to={`/${zipCode}/snow`}><span>Snow</span></Link>
            <Link to={`/${zipCode}/wind`}><span>Wind</span></Link>
            <Link to={`/${zipCode}/rain`}><span>Rain</span></Link>
        </div>
    )
}