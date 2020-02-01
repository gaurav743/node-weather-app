//Import core packages
const path = require("path")


//Import npm packages.
const express = require("express")
const hbs = require("hbs")

//Import local files.
const getLocationByName = require('../src/utils/getGeoLocationByName')
const getForecast = require('../src/utils/getForecastDetails')

const app = express() //express is a function and not an object.

// console.log(__dirname) //Gives current directory path.
// console.log(__filename) //Gives current file path.

const staticFilesPath = path.join(__dirname, "../public") //path.join allows us to move to a different path from current path.

//Setting path for dynamic views
const viewsPath = path.join(__dirname, "../templates/views")

//Path to partial views
const partialsPath = path.join(__dirname, "../templates/partials")

//Set templating engine
app.set("view engine", "hbs")

//Setting path to dynamic views:
app.set("views", viewsPath)
//Register partials
hbs.registerPartials(partialsPath)

app.use(express.static(staticFilesPath))


//Configure routing for template engine. We render template here instead of res.send(). We can pass object as second argument.
app.get("", (req,res) => {
    res.render('index', {
        title: "Weather",
        name: "Gaurav"
    })
})


app.get("/about", (req,res) => {
    res.render('about', {
        title: "About Me",
        name: "Gaurav"
    })
})

app.get("/help", (req,res) => {
    res.render('help', {
        title: "Help",
        name: "Gaurav",
        message: "Contact 122345 for further information."
    })
})

//Setting routing for querystring
app.get('/products', (req,res) => {

    if(!req.query.search){
         return res.send({
            error: "Please provide search term."
        })
    }

    console.log(req.query.search)
    console.log(req.query.id)

    res.send({
        products: []
    })
})

app.get("/weather", (req,res) => {
    if(!req.query.location){
        return res.send({
            error: "Please provide location."
        })
    }

    getLocationByName(req.query.location, (locationError, { latitude, longitude, location } = {}) => {
        if(locationError){
            return res.send({
                error: locationError
            })
        }
        else{
            getForecast({ latitude, longitude} , ( forecastError, forecast) => {
                if(forecastError){
                    return res.send({
                        error: forecastError
                    })
                }
                else{
                    res.send({
                        forecast: forecast
                    })
                }
            })
        }

    })
})

//Help pages that do not match any route pattern 
app.get('/help/*', (req,res) => {
    res.render('error', {
        title: 'Error',
        name: 'Gaurav',
        errorMessage: 'Help page not found.'
    })
})

//If the route does not match any of the route pattern above it will ba matched with the wildcard below.
app.get('*', (req,res) => {
    res.render('error', {
        title: 'Error',
        name: 'Gaurav',
        errorMessage:'Page does not exist.'
    })
})


//Configuring routing 

// app.get("", (req,res) => {
//     res.send("<h1>Hello express!!!</h1>")
// })

// app.get("/help", (req,res) => {
//     res.send({
//         name: "Gaurav",
//         age: 32
//     })
// })

// app.get("/about", (req,res) => {
//     res.send("<h1>Welcome to About page!!</h1>")
// })


//Sets up, intializes and runs node server on port 3000
app.listen(3000, () => {
    console.log("Port 3000 is up and running.")
})