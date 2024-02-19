const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const url = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@cluster0.sii7xz1.mongodb.net/?retryWrites=true&w=majority`;

const connectDB = () => {
    mongoose.connect(url)
        .then(() => {
            console.log('Connected to the database ')
        })
        .catch((err) => {
            console.error(`Error connecting to the database. n${err}`);
        })
}

module.exports = connectDB