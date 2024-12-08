import citiesByZip from "./zip_codes";

export function getCoordsFromZip(zipCode){
    return citiesByZip[zipCode]
}