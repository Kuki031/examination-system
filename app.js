'use strict';

const path = require('path');
const express = require('express');
//Better logging middleware
const morgan = require('morgan');
//Prevent cross-site scripting
const xss = require('xss-clean');
//headers
const helmet = require('helmet');
//Prevent NoSQL injections
const mongoSanitize = require('express-mongo-sanitize');
//Limit the api calls
const { rateLimit } = require('express-rate-limit');
//clean the query
const hpp = require('hpp');
//cors policy
const cors = require('cors');
//using cookies for authentification
const cookies = require('cookie-parser');
const APIerror = require('./utils/APIerror');
const errorController = require('./controllers/errorController');
const app = express();
const userRouter = require('./routers/userRouter');
const subjectRouter = require('./routers/subjectRouter');
const testRouter = require('./routers/testRouter');
const viewRouter = require('./routers/viewRouter');
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
//limit the API calls to 100/hour in intervals of 5 min
const limiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    limit: 100
})
app.use(limiter);
//limiting body parser to 10kb
app.use(express.json({
    limit: '10kb'
}));
app.use(cookies());
app.use(mongoSanitize());
app.use(helmet());
app.use(xss());
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
app.use(hpp({
    whitelist: ['sort', 'page', 'limit', 'fields']
}))
app.use('/', viewRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subjects', subjectRouter);
app.use('/api/v1/tests', testRouter);
app.use('/', errorController);
app.all('*', function (req, res, next) {
    next(new APIerror('Route does not exist.', 500));
})
module.exports = app;
