import { getWeather } from "./api"
import { useEffect, useState } from "react"

function App() {
  const [weather, setWeather] = useState({})

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await getWeather()
        setWeather(data)
        console.log(data.hourly)
      } catch(err) {
        console.error("Error fetching weather data: ", err)
      }
    }

    fetchWeather()
  }, [])

  return (
    <p>testing</p>
  )
}

export default App
