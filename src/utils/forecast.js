const request=require('request')

const forecast=(latitude,longitude,callback)=>{

    const url='http://api.weatherstack.com/current?access_key=12f5c89047c08f8400dd5d0cb9dc8025&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude);
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect weather service!',undefined)
        }else if(body.error){
            callback('Unable to find the location',undefined)
        }
        else{
            callback(undefined,{
                forecast:"The weather is "+body.current.weather_descriptions+" now and there is a temperature of "+body.current.temperature+' degrees and feels like '+body.current.feelslike+' degrees and wind spped is '+body.current.wind_speed +' with  '+body.current.wind_degree+' degrees in the direction of '+body.current.wind_dir +'   there is ' +body.current.precip +' precipitation in the air with UV index '+body.current.uv_index ,
                iconurl:body.current.weather_icons
            })

        }

    })
}
module.exports=forecast