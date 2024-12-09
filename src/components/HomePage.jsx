import { Outlet, useNavigate } from "react-router-dom";
import { getHourlyWeather, getDailyOverview } from "../api"
import { useEffect, useState } from "react"
import TempLineGraph from "../TempLineGraph"
import ZipcodeInput from "./ZipcodeInput"
import { getCoordsFromZip } from "../utils/utils"
import DailyOverview from "./DailyOverview"
import WeatherData from "./WeatherData";

export default function HomePage() {
    const [zipCode, setZipCode] = useState(98101)
    const navigate = useNavigate()

    function handleZipCodeSubmit(newZipCode){
      setZipCode(newZipCode)
      console.log(`navigate: /${newZipCode}`)
      navigate(`/${newZipCode}`)
    }

    return (
        <>
          <header>
            <h1>Recent & Forecasted Weather</h1>
          </header>
          <div className="main">
            <ZipcodeInput submitHelper={(zip) => handleZipCodeSubmit(zip)} />
            <WeatherData zipCode={zipCode}/>
          </div>
        </>
    )
}