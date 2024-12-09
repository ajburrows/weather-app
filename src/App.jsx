import { getCurrentTemperature, getHourlyWeather, getDailyOverview } from "./api"
import { useEffect, useState } from "react"
import TempLineGraph from "./TempLineGraph"
import ZipcodeInput from "./components/ZipcodeInput"
import { getCoordsFromZip } from "./utils/utils"
import DailyOverview from "./components/DailyOverview"

function App() {
  const [dailyOverviewData, setDailyOverviewData] = useState({})
  const [weather, setWeather] = useState({})
  const [zipCode, setZipCode] = useState()
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
      setZipCode(zipCode)
      setDailyOverviewData(overviewData)
    } catch(err) {
      console.error("Error fetching weather data: ", err)
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
            ? <TempLineGraph
                temperatures={tempsArray}
                times={timesArray}
                city={zipObj ? zipObj.city : "Seattle"}
                state={zipObj ? zipObj.state : "WA"}/>
            : null
          }
          <div className="data-container-bottom">
            <ZipcodeInput onZipCodeChange={setZipCode} zipCode={zipCode} submitHelper={fetchWeather} />
            <DailyOverview 
              current={dailyOverviewData?.current ? dailyOverviewData.current : null}
              max={dailyOverviewData?.daily?.temperature2mMax ? dailyOverviewData.daily.temperature2mMax : null}
              min={dailyOverviewData?.daily?.temperature2mMin ? dailyOverviewData.daily.temperature2mMin : null}
            />
          </div>
        </section>
      </div>
    </>
  )
}

export default App
