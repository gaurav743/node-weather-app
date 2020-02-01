const request = require("request")

const getGeoLocationByName = (locationName, callback) => {
    const baseUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
    const token = "pk.eyJ1IjoiZ2F1cmF2NzQzIiwiYSI6ImNrNXFmNml3cTAxcHgzbW5sZ2JlYWdjOGkifQ.1jbQvicuPY1GxHcjQ0br2w"
    const url = baseUrl + locationName + ".json?access_token=" + token;

    request({url , json: true}, (error, { body } = {}) => {
        if(error){
            callback("The mapBox service is unavailable", undefined )
        } else if(body.features.length === 0){
            callback("No geocode matched for the given location name", undefined)
        } else{
            callback(undefined , {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = getGeoLocationByName