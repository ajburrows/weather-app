import { fetchWeatherApi } from 'openmeteo';

// Get an object with the temperatures at a given latitude, longitude point and times corresponding to those temperatures
export async function getHourlyWeather(lat, lng){
    const params = {
        latitude: lat ? lat : 47.612,
        longitude: lng ? lng : -122.334,
        hourly: "temperature_2m",
        temperature_unit: "fahrenheit",
        timezone: "America/New_York",
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

    const hourly = response.hourly();

    const weatherData = {
        hourly: {
            time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
                (t) => new Date((t + utcOffsetSeconds) * 1000)
            ),
            temperature2m: hourly.variables(0).valuesArray(),
        },
    };

    return weatherData
}

export async function getDailyOverview(lat, lng){

    const params = {
    latitude: lat ? lat : 47.612,
    longitude: lng ? lng : -122.334,
    current: "temperature_2m",
    daily: ["temperature_2m_max", "temperature_2m_min"],
    temperature_unit: "fahrenheit",
    wind_speed_unit: "mph",
    precipitation_unit: "inch",
    timezone: "America/New_York",
    forecast_days: 1,
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
    const minutely15 = response.minutely15();
    const daily = response.daily();

    const weatherData = {
    current: {
        time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
        temperature2m: current.variables(0).value(),
    },
    daily: {
        time: range(
        Number(daily.time()),
        Number(daily.timeEnd()),
        daily.interval()
        ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
        temperature2mMax: daily.variables(0).valuesArray(),
        temperature2mMin: daily.variables(1).valuesArray(),
    },
    };

    return weatherData
}