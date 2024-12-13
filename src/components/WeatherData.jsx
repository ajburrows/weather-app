import { useParams } from "react-router-dom"
import { getHourlyWeather2 } from "../api"
import { useEffect, useState } from "react"
import TempLineGraph from "../TempLineGraph"
import { getCoordsFromZip } from "../utils/utils"
import DailyOverview from "./DailyOverview"
import Alerts from "./Alerts"

export default function WeatherData() {
    const params = useParams()
    const zipCode = params.zipCode

    const [weatherData, setWeatherData] = useState({})

    // Locational data
    const zipObj = zipCode && zipCode.length === 5 ? getCoordsFromZip(zipCode) : null
    const lat = zipObj ? zipObj.lat : null
    const lng = zipObj ? zipObj.lng : null

    // Weekly data
    const temperatures = weatherData?.hourly ? weatherData.hourly.temperature2m : null
    const times = weatherData?.hourly?.time ? weatherData.hourly.time : null

    // Daily Overview data
    const currentTemp = weatherData?.current ? weatherData.current.temperature2m : null
    const todayMaxTemp = weatherData?.daily ? weatherData.daily.temperature2mMax[3] : null
    const todayMinTemp = weatherData?.daily ? weatherData.daily.temperature2mMin[3] : null


    async function fetchAllData() {
        try{
            console.log(`Fetching all data from zip: ${zipCode}`)
            const weatherData = await getHourlyWeather2(lat, lng, "America/New_York")
            setWeatherData(weatherData)
        } catch(err) {
            console.log(`Error fetching weather data: ${err}`)
        }
    }

    useEffect(() => {
        fetchAllData()
    }, [zipCode])

    // These arrays contain the data to be plotted. Times are the horizontal axis and temps are the vertical axis
    const tempsArray = temperatures ? Object.values(temperatures) : null
    const timesArray = times

    const WeeklyGraphs = {
        "Temp": <TempLineGraph
                    temperatures={tempsArray}
                    times={timesArray}
                    city={zipObj ? zipObj.city : "Seattle"}
                    state={zipObj ? zipObj.state : "WA"}
                />
    }

    return (

        <section className="data-container">
            {/*Render the line graph*/}
            {temperatures && times 
            ? WeeklyGraphs["Temp"]
            : null
            }

            <DailyOverview 
                current={currentTemp}
                max={todayMaxTemp}
                min={todayMinTemp}
            />

            <Alerts />
        </section>
    )
}