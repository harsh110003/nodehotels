const express = require('express')
const app = express()
const db = require('./db');

const MenuItem = require('./models/MenuItem');

const bodyParser = require('body-parser');
app.use(bodyParser.json());  //req.body store parsed data










app.get('/', function (req,res){
    res.send('Welcome to our Hotel')
})

/*app.get('/idli',(req,res) => {
    var customized_idli = {
        name:'rava idli',
        size: '10 cm diameter',
        is_sambhar: true,
        is_chutney: false
}
    res.send(customized_idli)
})

app.get('/chicken',(req,res)=>{
    res.send('sure sir i would love to serve chicken')
})

app.post('/item',(res,req) =>{
    res.send('data is received')
})

 app.get('/weather', (req, res) => {
 const weatherData = {
 temperature: 25,
 conditions: 'Sunny',
 city: 'Los Angeles'
 };
 res.json(weatherData);
 });
 app.listen(3000, () => {
 console.log('Server is running on port 3000');
 });*/

// import the router files
const personRoutes = require('./routes/personRoutes')
const menuRoutes = require('./routes/menuRoutes')

//use the routers
app.use('/person', personRoutes)
app.use('/menuitem', menuRoutes)



 
app.listen(3000 , () => {
    console.log('listening to port 3000')
})