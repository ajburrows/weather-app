import citiesByZip from "./zip_codes";

// Get an object with additional information on the given zip code
export function getCoordsFromZip(zipCode){
    return citiesByZip[zipCode]
}

// Return an array of strings that have the month, day, and hour of every entry in times
export function reduceTimeData(times){
    // Times is the result of the open meteo api from getWeather in api.js
    // times is an array of objects
    // Ex) Mon Dec 02 2024 19:00:00 GMT-0500 (Eastern Standard Time)

    return times.map(timeObj => {
        const timeStr = JSON.stringify(timeObj)
        const date = timeStr.split("T")[0].substring(6)
        const time = timeStr.split("T")[1].substring(0,5)
        return `${date} ${time}`
    })
}