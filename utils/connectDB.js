'use strict';

const APIerror = require('./APIerror');

module.exports = async function (mongoConnectionString, DBoptions) {
    try {
        await mongoConnectionString.connect(DBoptions);
        console.log('Connection to database established.');
    }
    catch (err) {
        return new APIerror('Failed to connect to database.', 500);
    }
}
