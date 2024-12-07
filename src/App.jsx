import { getWeather } from "./api"
import { useEffect, useState } from "react"
import TempLineGraph from "./TempLineGraph"
import ZipcodeInput from "./components/ZipcodeInput"

function App() {
  const [weather, setWeather] = useState({})
  const [zipCode, setZipCode] = useState()
  const temperatures = weather.temperature2m
  const times = weather.time

  async function fetchWeather(zipCode) {
    try {
      console.log(`Fetching weather from zip: ${zipCode}`)
      const data = await getWeather()
      setWeather(data.hourly)
      setZipCode(zipCode)
    } catch(err) {
      console.error("Error fetching weather data: ", err)
    }
  }

  useEffect(() => {
    fetchWeather()
  }, [])

  const tempsArray = temperatures ? Object.values(temperatures) : null
  const timesArray = times ? Object.values(times) : null

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
