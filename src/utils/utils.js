import citiesByZip from "./zip_codes";

export function getCoordsFromZip(zipCode){
    return citiesByZip[zipCode]
}

export function processTimes(times){
    return times.map(timeObj => {
        const timeStr = JSON.stringify(timeObj)
        const date = timeStr.split("T")[0].substring(6)
        const time = timeStr.split("T")[1].substring(0,5)
        return `${date} ${time}`
    })
}