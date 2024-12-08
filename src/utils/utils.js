import citiesByZip from "./zip_codes";

// Get an object with additional information on the given zip code
export function getCoordsFromZip(zipCode){
    return citiesByZip[zipCode]
}