import { useParams } from "react-router-dom"

export default function WeatherData() {
    const params = useParams()
    return (
        <h1>Weather Data in {params.id}</h1>
    )
}