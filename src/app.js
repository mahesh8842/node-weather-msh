const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app=express()
const port=process.env.PORT || 3000

const publicdirectoryPath=path.join(__dirname,'../public');
const viewpath=path.join(__dirname,'../templates/views')
const partialpath=path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewpath)
hbs.registerPartials(partialpath)

app.use(express.static(publicdirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather ',
        name:'Mahesh'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
          error:'You must provide an address!'  
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastdata)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastdata.forecast,
                icon:forecastdata.iconurl,
                location,
                address:req.query.address
            })
        })
    })
    
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Mahesh kumar chanda'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        info:'Enter place name to get the weather info'
    })
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:'help',
        info:'page'
    })
})
app.get('*',(req,res)=>{
    res.render('error',{
        title:'404 page',
    })
})



app.listen(port,()=>{
    console.log('server is up on' +port)
})