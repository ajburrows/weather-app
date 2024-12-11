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

    /*
      Goal: display the weather data for the selected metric.

      Notes:
        - When a metric is selected, it is stored in the path after the zipcode
        - The data for every metric is fetched by the api call
        - After making the call, construct a data container for every metric
        - Then just conditionally render the data container that corresponds to the path
    */

    return (
        <>
          <header>
            <h1>Recent & Forecasted Weather</h1>
          </header>
          <div className="main">
            <ZipcodeInput submitHelper={(zip) => handleZipCodeSubmit(zip)} />
            <div className="dashboard-container">
              <WeatherData zipCode={zipCode}/>
              <MetricsMenu zipCode={zipCode}/>
            </div>
          </div>
        </>
    )
}