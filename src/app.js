const path = require('path')
const hbs = require('hbs')
const express = require('express')
const utilsfile = require('./utils/utils.js')
//to get current directory and directory path
console.log(__dirname)
console.log(__filename)

//initialize app
const app = express()

//Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//set up handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//set up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather App',
        name : 'Harish',
        age : '26'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About',
        name : 'Harish',
        age : '26'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title: 'Help',
        name : 'Harish',
        age : '26'
    })
})

app.get('/weather',(req,res) => {
    if (!req.query.location){
        return res.send([{
            error:'Provide the location'
        }])
    } else {
        utilsfile.geolocation(req.query.location,(error,data) =>{
            if (error){
                return res.send([{
                    error:error
                }])
                } else {
                    utilsfile.forecast(data.latitude,data.longitude,data.location,(error,data)=>{
                        if (error){
                            return res.send([{
                                error:error
                            }])
                        }else{
                            return res.send([{
                                forecast:data,
                                location:req.query.location
                            }])
                        }
                    })
                }
          
        })
    }
    
})

//setting error pages
// if none of the above routers match, this will be excuted
app.get('*',(req,res) => {
    res.render('404',{
        title:'error',
        name : 'Harish',
        message: 'Page Not Found'
    })
})

// Starting the server

app.listen(5000, ()=>{
    console.log('server is up and runing')
})

//for auto refresh use nodemon src/app.js in terminal