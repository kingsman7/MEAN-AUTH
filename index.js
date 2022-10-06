const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./db/config');

/* Loading the environment variables from the .env file. */
require('dotenv').config()

/* Creating an instance of the express application. */
const app = express()

/* A function that connects to the database. */
dbConnection()

/* Serving the static files in the public folder. */
app.use(express.static('public'))

//app.use middleware
/* implement cors */
app.use(cors()) //cors
/* Parsing the body of the request. */
app.use(express.json()) 
/* Importing the routes from the auth.js file. */
app.use( '/api/auth', require('./routes/auth') ); // rutas


/* Listening to the port process.env.PORT. */
app.listen(process.env.PORT, () => {
  console.log(`Serve running on port: ${process.env.PORT}`)
})
