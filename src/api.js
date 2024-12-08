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

    // Note: The order of weather variables in the URL query and the indices below need to match!
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


export async function getCurrentTemperature(lat, lng){

    const params = {
    latitude: lat ? lat : 47.612,
    longitude: lng ? lng : -122.334,
    minutely_15: "temperature_2m",
    temperature_unit: "fahrenheit",
    timezone: "America/New_York",
    forecast_days: 1,
    forecast_minutely_15: 1, // Limit forecast to 2 points into the future
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

    const minutely15 = response.minutely15();

    // Note: The order of weather variables in the URL query and the indices below need to match!
    const weatherData = {
    minutely15: {
        time: range(
        Number(minutely15.time()),
        Number(minutely15.timeEnd()),
        minutely15.interval()
        )
        .slice(0, 2) // Limit to the first 2 points
        .map((t) => new Date((t + utcOffsetSeconds) * 1000)),
        temperature2m: minutely15.variables(0).valuesArray(),
    },
    };

    return weatherData.minutely15.temperature2m[0]
}