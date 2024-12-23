import { TiWeatherSunny, TiWeatherPartlySunny, TiWeatherCloudy, TiWeatherShower, TiWeatherSnow, TiWeatherDownpour, TiWeatherStormy } from "react-icons/ti";




const weatherCodeIcons = {
    '0': "Clear skies",
    '1': "Mainly clear",
    '2': "Partly cloudy",
    '3': "Overcast",
    '45': "Fog",
    '48': "Fog",
    '51': "Light drizzle",
    '53': "Moderate drizzle",
    '55': "dense drizzle",
    '56': 'Light freezing drizzle',
    '57': 'Dense freezing drizzle',
    '61': 'Light rain',
    '63': 'Moderate rain',
    '65': 'Heavy rain',
    '66': 'Lright freezing rain',
    '67': 'Heavy freezing rain',
    '71': 'Light snow',
    '73': 'Moderate snow',
    '75': 'Heavy snow',
    '77': 'Snow grains',
    '80': 'Light rain showers',
    '81': 'Moderate rain showers',
    '82': 'Heavy rain showers',
    '85': 'Light snow showers',
    '86': 'Heavy snow showers',
    '95': 'Thunderstorm',
    '96': 'Thunderstorm and light hail',
    '99': 'Thunderstorm and heavy hail' 
}

export default function WeatherCode( {code}) {
    console.log("code ", code)
    return(
        <div className="weather-code-container">
            <h3>Weather Code:</h3>
            <p></p>
            <div>{weatherCodeIcons[code]}</div>
        </div>
    )
}