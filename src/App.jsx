import { getWeather } from "./api"
import { useEffect, useState } from "react"
import TempLineGraph from "./TempLineGraph"
import { Chart } from "chart.js"

function App() {
  const [weather, setWeather] = useState({})
  const temperatures = weather.temperature2m
  const times = weather.time

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await getWeather()
        setWeather(data.hourly)
      } catch(err) {
        console.error("Error fetching weather data: ", err)
      }
    }

    fetchWeather()
  }, [])

  const temps = [10,20,30,40,50]

  const tempsArray = temperatures ? Object.values(temperatures) : null
  const timesArray = times ? Object.values(times) : null
  
  return (
    <>
      <p>testing</p>
      {temperatures && times 
        ? <TempLineGraph temperatures={tempsArray} times={timesArray} />
        : null
      }
    </>
  )
}

export default App
