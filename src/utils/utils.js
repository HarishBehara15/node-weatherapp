const request = require('postman-request')


//function with callback
const geolocation = (location,callback) => {
    const geourl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(location)+'.json?access_token=pk.eyJ1IjoiaGFyaXNoYmVoYXJhMTUiLCJhIjoiY2tzaGttZmVwMXBvNTJ1cDJ1aGxmbGQyZCJ9.0X5pnOVccqHuQ7pODthssA&limit=1'

    request({url:geourl,json:true},(error,response,body)=>{
        if (error){
            callback('Unable to connect to the weather services',undefined)
        }else if (response.body.features.length === 0){
            callback('There is no response for the location',undefined)
        }else {
            callback(undefined,{
                latitude : response.body.features[0].center[1],
                longitude : response.body.features[0].center[0],
                location : response.body.features[0].place_name
        })
        }
    })
}


const forecast = (latitude,longitude,place,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=1f9749e5342448eb6c48286f7b97e4e4&query='+latitude+','+longitude+'&units=m'
    request({url :url,json:true},function(error,response,body){
        if (error){
            callback('Unable to connect to weather services',undefined)
        } else if(response.body.error){
            callback('Unable to find the location')
        } else {
            callback(undefined,response.body.current.weather_descriptions+', It is currently '+response.body.current.temperature+ ' degrees out. it fells like '+response.body.current.feelslike + ' degrees out at '+place)
        }
    })
}

module.exports = {
    geolocation : geolocation,
    forecast:forecast
}