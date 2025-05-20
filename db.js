const mongoose = require('mongoose');
require('dotenv').config();

//define the mongodb connection URL
//const mongoURL = process.env.MONGODB_URL_LOCAL  //replace 'mydatabase' with your database name.
//global mongodb atlas url 
const mongoURL = process.env.MONGODB_URL

//setup mongodb connection
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//mongoose maintain a default connection object representing the mongodb connection. below db is the object.
const db = mongoose.connection;

// Define eventlistners for database connection
db.on('connected', () => {
    console.log('Connected to mongodb server');
})

// Error event listener
db.on('error', (err) => {
    console.log('Error connecting to mongodb server:', err);
})

// Disconnection eventlistner
db.on('disconnected', () => {
    console.log('Disconnected from mongodb server');
})

module.exports = db;