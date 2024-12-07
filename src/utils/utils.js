import citiesByZip from "./zip_codes";

export function getCoordsFromZip(zipCode){
    const cityObj = citiesByZip[zipCode]
    console.log(cityObj)
}