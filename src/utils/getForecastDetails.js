const request = require("request")

const getForecastDetails = ({latitude, longitude}, callback) => {
    const baseUrl = "https://api.darksky.net/forecast/ac42e4c4effe5453521b99f65ee84127/"
    const url = baseUrl + latitude + "," + longitude

    request( { url, json: true} , (error, response) => {
        if(error){
            callback("The forecase service is unavailable.", undefined)
        } else if (response.body.error) {
            callback("The forecast is not available for given co-ordinates.", undefined)
        } else {
            callback(undefined, response.body.currently)
        }
    })
}

module.exports = getForecastDetails