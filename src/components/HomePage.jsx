import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react"
import ZipcodeInput from "./ZipcodeInput"
import WeatherData from "./WeatherData";
import MetricsMenu from "./MetricsMenu";

export default function HomePage() {
    const [zipCode, setZipCode] = useState(98101)
    const navigate = useNavigate()
    const params = useParams()
    

    function handleZipCodeSubmit(newZipCode){
      setZipCode(newZipCode)
      const navPath = params.metric ? `/${newZipCode}/${params.metric}` : `/${newZipCode}`
      navigate(navPath)
    }

    return (
        <>
          <header>
            <h1>Recent & Forecasted Weather</h1>
          </header>
          <div className="main">
            <ZipcodeInput changeZip={(zip) => handleZipCodeSubmit(zip)} />
            <div className="dashboard-container">
              <WeatherData zipCode={zipCode}/>
              <MetricsMenu zipCode={zipCode}/>
            </div>
          </div>
        </>
    )
}