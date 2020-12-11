const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const request = require('request')
const apiKey = "eba9a2c9dce9c9d3077b9cedd33afd0e"

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function (req, res) {
    res.render('index')
})

app.post('/', function (req, res) {
    let city = req.body.city
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
    res.render('index')

    request(url, function (err, response, body) {
        if (err) {
            res.render('index', { weather: null, error: 'This is wrong, you need to fix this' })

        } else {


            let weather = JSON.parse(body)

            if (weather.main == undefined) {
                res.render('index', { weather: null, error: 'This is wrong' })
            } else {
                let message = ` It is ${weather.main.temp} degress outside in ${weather.name}`
                res.render('index', { weather: message, error: null })
            }
        }
    })
})
request(url, function(err, response, body){
    if (err){
        console.log("error:",err);
    } else {
        console.log('body:', body)
        let weather = JSON.parse(body);

        let message = ` it is ${weather.main.temp} degrees outside`
    }
})


const port = 3001

app.listen(port, () => {
    console.log(`I am using ${port}`)
})