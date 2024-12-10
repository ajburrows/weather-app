import { useNavigate } from "react-router-dom";
import { useState } from "react"
import ZipcodeInput from "./ZipcodeInput"
import WeatherData from "./WeatherData";
import MetricsMenu from "./MetricsMenu";

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
            <div className="dashboard-container">
              <WeatherData zipCode={zipCode}/>
              <MetricsMenu />
            </div>
          </div>
        </>
    )
}