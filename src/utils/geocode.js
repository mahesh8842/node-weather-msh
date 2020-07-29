const request=require('request')

const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibWFoZXNoODg0MiIsImEiOiJja2N3eng0NWYwaXE1MnhtanBuM2RoOTE5In0.mf85Fpqfk8ZhsV44tRQ3JQ&limit=1'
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to location services!',undefined)
        }
        else if(body.features.length===0){
            callback('Invalid location please try another search',undefined)
        }
        else{
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
        })}
        
    })
    }
module.exports=geocode