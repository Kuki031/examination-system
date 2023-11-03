'use strict';

module.exports = function (err, req, res, next) {
    err.name = err.name;
    err.statusCode = err.statusCode;
    err.status = err.status;
    err.stack = err.stack
    err.message = err.message;
    if (process.env.NODE_ENV === 'development') res.status(err.statusCode).json({ name: err.name, status: err.status, stack: err.stack, message: err.message, err });
    if (process.env.NODE_ENV === 'production') res.status(err.statusCode).json({ status: err.status, message: err.message });
    next(err);
}

