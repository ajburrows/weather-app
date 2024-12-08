import { getWeather } from "./api"
import { useEffect, useState } from "react"
import TempLineGraph from "./TempLineGraph"
import ZipcodeInput from "./components/ZipcodeInput"
import { getCoordsFromZip, reduceTimeData } from "./utils/utils"

function App() {
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
      const data = await getWeather(lat, lng)
      setWeather(data.hourly)
      setZipCode(zipCode)
    } catch(err) {
      console.error("Error fetching weather data: ", err)
    }
  }

  useEffect(() => {
    fetchWeather()
  }, [])

  // These arrays contain the data to be plotted. Times are the horizontal axis and temps are the vertical axis
  const tempsArray = temperatures ? Object.values(temperatures) : null
  const timesArray = times ? reduceTimeData(Object.values(times)) : null

  return (
    <>
      {temperatures && times 
        ? <TempLineGraph temperatures={tempsArray} times={timesArray} />
        : null
      }
      <ZipcodeInput onZipCodeChange={setZipCode} zipCode={zipCode} submitHelper={fetchWeather} />
    </>
  )
}

export default App
