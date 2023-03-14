const express = require('express');
const dotenv = require('dotenv/config');
const bodyParser = require('body-parser'); //helps to send json data from postman
const morgan = require('morgan'); //use to log our http request use in middleware
const mongoose = require('mongoose');
const connectDB = require('./config/db')
const colors = require('colors')

const app = express();
const port = process.env.PORT;
const api = process.env.API_URL;
connectDB()

// middleware
app.use(bodyParser.json());
app.use(morgan("tiny")); //eg : POST /api/v1/products 200 43 - 7.607 ms


// Routes
app.use(`${api}/products`, require("./routes/productRoutes"));
app.use(`${api}/category`, require("./routes/categoryRoutes"));

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
