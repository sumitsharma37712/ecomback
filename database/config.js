const mongoose = require('mongoose');
// const validator = require('validator');
//const MONGO_URL = 'mongodb://127.0.0.1:27017/ecom';
require('dotenv').config()
const MONGO_URL = process.env.MONGODB;

mongoose.connect(MONGO_URL)
    .then(() => {
        console.log('Successful connection to the MongoDB database');
    })
    .catch((err) => {
        console.error('Error connecting to the MongoDB database:', err);
    });

// const connectDB = async () => {
//     try {
//         const conn = await mongoose.connect(MONGO_URL, {
//             useNewUrlParser: true,
//         });
//         console.log(`MongoDB Connected: {conn.connection.host}`);
//     } catch (error) {
//         console.error(error.message);
//         process.exit(1);
//     }
// }

// module.exports = connectDB;
