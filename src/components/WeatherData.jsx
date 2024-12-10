import { useParams } from "react-router-dom"
import { getHourlyWeather, getDailyOverview } from "../api"
import { useEffect, useState } from "react"
import TempLineGraph from "../TempLineGraph"
import { getCoordsFromZip } from "../utils/utils"
import DailyOverview from "./DailyOverview"
import Alerts from "./Alerts"

export default function WeatherData() {
    const params = useParams()
    const zipCode = params.zipCode
    const [weather, setWeather] = useState({})
    const [dailyOverviewData, setDailyOverviewData] = useState({})
    const temperatures = weather.temperature2m
    const times = weather.time
    const zipObj = zipCode && zipCode.length === 5 ? getCoordsFromZip(zipCode) : null
    const lat = zipObj ? zipObj.lat : null
    const lng = zipObj ? zipObj.lng : null

    async function fetchWeather() {
        try {
        console.log(`Fetching weather from zip: ${zipCode}`)
        const hourlyData = await getHourlyWeather(lat, lng)
        const overviewData = await getDailyOverview(lat, lng)
        setWeather(hourlyData.hourly)
        setDailyOverviewData(overviewData)
        } catch(err) {
        console.error("Error fetching weather data: ", err)
        }
    }


    useEffect(() => {
        fetchWeather()
    }, [zipCode])

    // These arrays contain the data to be plotted. Times are the horizontal axis and temps are the vertical axis
    const tempsArray = temperatures ? Object.values(temperatures) : null
    const timesArray = times
    return (

        <section className="data-container">
            {/*Render the line graph*/}
            {temperatures && times 
            ? <TempLineGraph
                temperatures={tempsArray}
                times={timesArray}
                city={zipObj ? zipObj.city : "Seattle"}
                state={zipObj ? zipObj.state : "WA"}/>
            : null
            }

            {console.log("rendering DailyOverview")}
            <DailyOverview 
            current={dailyOverviewData?.current ? dailyOverviewData.current : null}
            max={dailyOverviewData?.daily?.temperature2mMax ? dailyOverviewData.daily.temperature2mMax : null}
            min={dailyOverviewData?.daily?.temperature2mMin ? dailyOverviewData.daily.temperature2mMin : null}
            />

            <Alerts />
        </section>
    )
}