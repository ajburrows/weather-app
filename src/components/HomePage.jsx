import { Outlet } from "react-router-dom";
import { getHourlyWeather, getDailyOverview } from "../api"
import { useEffect, useState } from "react"
import TempLineGraph from "../TempLineGraph"
import ZipcodeInput from "./ZipcodeInput"
import { getCoordsFromZip } from "../utils/utils"
import DailyOverview from "./DailyOverview"
import WeatherData from "./WeatherData";

export default function HomePage() {
    const [zipCode, setZipCode] = useState(98101)

    return (
        <>
          <header>
            <h1>Recent & Forecasted Weather</h1>
          </header>
          <div className="main">
            <ZipcodeInput submitHelper={(zip) => setZipCode(zip)} />
            <WeatherData zipCode={zipCode}/>
          </div>
        </>
    )
}