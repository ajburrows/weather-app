import { Link } from "react-router-dom"

export default function NotFoundPage() {
    return (
        <div>
            404 Error: Page Not Found
            <Link to="/">Return Home</Link>            
        </div>
    )
}