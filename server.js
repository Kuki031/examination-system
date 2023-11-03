'use strict';

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');
const connectToDB = require('./utils/connectDB');

process.on('uncaughtException', err => {
    console.log(err.name, err.message);
    console.log('Uncaught exception. Shutting down...');
    process.exit(1);
})


const localhost = process.env.LOCALHOST;
const port = process.env.PORT;
const DATABASE = process.env.DB_CONNECT.replace('<password>', process.env.DB_PASSWORD);

connectToDB(mongoose, DATABASE);


const server = app.listen(port, localhost, () => {
    console.log(`App running on ${localhost}:${port}`);
})

process.on('unhandledRejection', err => {
    console.log(err.name, err.message);
    console.log('Unhandled rejection. Shutting down...');
    server.close(() => {
        process.exit(1);
    })
})
