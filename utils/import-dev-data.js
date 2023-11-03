'use strict';

const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const mongoose = require('mongoose');
const connectDB = require('../utils/connectDB');
const DATABASE = process.env.DB_CONNECT.replace('<password>', process.env.DB_PASSWORD);
const Subject = require('../models/subjectsModel');
const subjectData = JSON.parse(fs.readFileSync('./dev-data/subjects.json', 'utf-8'));
const Test = require('../models/testsModel');
const testData = JSON.parse(fs.readFileSync('./dev-data/tests.json', 'utf-8'));
const User = require('../models/userModel');
const userData = JSON.parse(fs.readFileSync('./dev-data/users.json', 'utf-8'));
connectDB(mongoose, DATABASE);

const importAll = async function () {
    try {
        await Subject.create(subjectData);
        await Test.create(testData);
        await User.create(userData);
        console.log('Database entries populated succesfuly.')
    }
    catch (err) {
        console.error(err.message);
    }
    process.exit();
}

const deleteAll = async function () {
    try {
        await Subject.deleteMany({});
        await Test.deleteMany({});
        await User.deleteMany({});
        console.log('Database entries deleted succesfuly.');
    }
    catch (err) {
        console.error(err.message);
    }
    process.exit();
}
if (process.argv[2] === '--import') importAll();
if (process.argv[2] === '--delete') deleteAll();
