import { getCurrentTemperature, getHourlyWeather } from "./api"
import { useEffect, useState } from "react"
import TempLineGraph from "./TempLineGraph"
import ZipcodeInput from "./components/ZipcodeInput"
import { getCoordsFromZip } from "./utils/utils"
import CurrentData from "./components/CurrentData"

function App() {
  const [weather, setWeather] = useState({})
  const [zipCode, setZipCode] = useState()
  const [curTemp, setCurTemp] = useState(58)
  const temperatures = weather.temperature2m
  const times = weather.time
  const zipObj = zipCode && zipCode.length === 5 ? getCoordsFromZip(zipCode) : null
  const lat = zipObj ? zipObj.lat : null
  const lng = zipObj ? zipObj.lng : null

  

  console.log(`zip: ${zipCode}`)

  async function fetchWeather() {
    try {
      console.log(`Fetching weather from zip: ${zipCode}`)
      const data = await getHourlyWeather(lat, lng)
      setWeather(data.hourly)
      setZipCode(zipCode)
      assignCurrentTemp()
    } catch(err) {
      console.error("Error fetching weather data: ", err)
    }
  }

  async function assignCurrentTemp(){
    try{
      console.log(`Fetching current temperature from zip: ${zipCode}`)
      const data = await getCurrentTemperature(lat, lng)
      setCurTemp(data.toFixed(1))
    } catch(err) {
      console.log("Error fetching current temperatrue: ", err)
    }
  }

  useEffect(() => {
    fetchWeather()
  }, [])

  // These arrays contain the data to be plotted. Times are the horizontal axis and temps are the vertical axis
  const tempsArray = temperatures ? Object.values(temperatures) : null
  const timesArray = times

  return (
    <>
      <header>
        <h1>Recent & Forecasted Weather</h1>
      </header>
      <div className="main">
        <section className="data-container">
          {temperatures && times 
            ? <TempLineGraph temperatures={tempsArray} times={timesArray} city={zipObj.city} state={zipObj.state}/>
            : null
          }
          <div className="data-container-bottom">
            <ZipcodeInput onZipCodeChange={setZipCode} zipCode={zipCode} submitHelper={fetchWeather} />
            <CurrentData zipObj={zipObj} curTemp={curTemp} />
          </div>
        </section>
      </div>
    </>
  )
}

export default App
