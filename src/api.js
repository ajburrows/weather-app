import { fetchWeatherApi } from 'openmeteo';

export async function getHourlyWeather2(lat, lng, zip_timezone){
    const params = {
        latitude: lat ? lat : 47.612,
        longitude: lng ? lng : -122.334,
        current: ["temperature_2m", "relative_humidity_2m", "apparent_temperature", "is_day", "precipitation", "snowfall", "weather_code", "wind_speed_10m", "wind_direction_10m", "wind_gusts_10m"],
        daily: ["temperature_2m_max", "temperature_2m_min"],
        hourly: ["temperature_2m", "relative_humidity_2m", "precipitation_probability", "precipitation", "snowfall", "wind_speed_10m"],
        temperature_unit: "fahrenheit",
        wind_speed_unit: "mph",
        precipitation_unit: "inch",
        timezone: zip_timezone,
        past_days: 3,
        forecast_days: 4
    };
    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);

    // Helper function to form time ranges
    const range = (start, stop, step) =>
        Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

    // Process first location. Add a for-loop for multiple locations or weather models
    const response = responses[0];

    // Attributes for timezone and location
    const utcOffsetSeconds = response.utcOffsetSeconds();
    const timezone = response.timezone();
    const timezoneAbbreviation = response.timezoneAbbreviation();
    const latitude = response.latitude();
    const longitude = response.longitude();

    const current = response.current();
    const hourly = response.hourly();
    const daily = response.daily();

    // Note: The order of weather variables in the URL query and the indices below need to match!
    const weatherData = {
        current: {
            time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
            temperature2m: current.variables(0).value(),
            relativeHumidity2m: current.variables(1).value(),
            apparentTemperature: current.variables(2).value(),
            isDay: current.variables(3).value(),
            precipitation: current.variables(4).value(),
            snowfall: current.variables(5).value(),
            weatherCode: current.variables(6).value(),
            windSpeed10m: current.variables(7).value(),
            windDirection10m: current.variables(8).value(),
            windGusts10m: current.variables(9).value(),
        },
        hourly: {
            time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
                (t) => new Date((t + utcOffsetSeconds) * 1000)
            ),
            temperature2m: hourly.variables(0).valuesArray(),
            relativeHumidity2m: hourly.variables(1).valuesArray(),
            precipitationProbability: hourly.variables(2).valuesArray(),
            precipitation: hourly.variables(3).valuesArray(),
            snowfall: hourly.variables(4).valuesArray(),
            windSpeed10m: hourly.variables(5).valuesArray(),
        },
        daily: {
            time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
                (t) => new Date((t + utcOffsetSeconds) * 1000)
            ),
            temperature2mMax: daily.variables(0).valuesArray(),
            temperature2mMin: daily.variables(1).valuesArray(),
        },
    };

    return weatherData
}