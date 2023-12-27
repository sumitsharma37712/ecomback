const mongoose = require('mongoose');
// const validator = require('validator');
// const MONGO_URL = 'mongodb://127.0.0.1:27017/ecom';
require('dotenv').config()
const MONGO_URL = process.env.MONGODB;

mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Successful connection to the MongoDB database');
    })
    .catch((err) => {
        console.error('Error connecting to the MongoDB database:', err);
    });
    