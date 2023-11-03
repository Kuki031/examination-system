'use strict';

const { promisify } = require('util');
const User = require('../models/userModel');
const APIerror = require('../utils/APIerror');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/email');
const handlerFactory = require('../utils/handlerFactory')

const signToken = function (id) {
    return jwt.sign({ id: id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

const cookieOptions = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: true
}


exports.signUp = async function (req, res, next) {
    try {
        if (req.body.role) return next(new APIerror('You cannot assign role to yourself!', 400));
        const newUser = await User.create(req.body);
        const token = signToken(newUser._id);
        if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
        res.status(201).cookie('jwt', token, cookieOptions).json({
            status: 'success',
            token,
            data: {
                data: newUser
            }
        })
    }
    catch (err) {
        console.log(err);
        return next(new APIerror('Something went very wrong!', 500));
    }
}

exports.logIn = async function (req, res, next) {
    try {
        const { email, password } = req.body;
        if (!email || !password) return next(new APIerror('You must provide e-mail and password!', 400));
        const user = await User.findOne({ email: email }).select('+password');

        if (!user || !await user.correctPassword(password, user.password)) return next(new APIerror('Incorrect e-mail or password!', 401));

        const token = signToken(user._id);
        if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
        res.status(200).cookie('jwt', token, cookieOptions).json({
            status: 'success',
            token,
            message: 'You succesfuly logged in!'
        });
    }
    catch (err) {
        return next(new APIerror('Something went very wrong!', 500));
    }
}

exports.logOut = function (req, res) {
    res.cookie('jwt', '', {
        expiresIn: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    })
    res.status(200).json({
        status: 'success'
    })
}


exports.protect = async function (req, res, next) {
    let token;
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) token = req.headers.authorization.split(" ")[1];
        else if (req.cookies.jwt) token = req.cookies.jwt;
        if (!token) return next(new APIerror('You are not logged in!', 401));
        const decodedToken = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decodedToken.id });
        if (!user) return next(new APIerror('User with this token does not exist!', 401));

        req.user = user;
        next();
    }
    catch (err) {
        return next(new APIerror('Something went very wrong!', 500));
    }
}

exports.restrict = function (...roles) {
    return function (req, res, next) {
        if (!roles.includes(req.user.role)) return next(new APIerror('You are not authorized to perform this action!', 401));
        next();
    }
}


exports.forgotPassword = async function (req, res, next) {
    try {
        const { email } = req.body;
        if (!email) return next(new APIerror('Please provide e-mail adress.', 400));
        const user = await User.findOne({ email: email });
        user.createPasswordResetToken();
        await user.save({ validateModifiedOnly: true });
        const message = `Submit PATCH request on ${req.get('host')}/api/v1/users/reset-password/${user.passwordResetToken}`;
        try {
            await sendEmail({
                email: email,
                subject: 'Your password reset token',
                message: message
            })
        } catch (err) {
            user.passwordResetToken = undefined;
            user.passwordResetTokenValid = undefined;
            await user.save({ validateModifiedOnly: true });
            return next(new APIerror('E-mail has not been sent!', 500));
        }
        res.status(200).json({
            status: 'success',
            message: 'Password reset token sent to e-mail!'
        })
    }
    catch (err) {
        return next(new APIerror('Something went very wrong!', 500));
    }
}


exports.resetPassword = async function (req, res, next) {
    try {
        const token = req.params.token;
        if (!token) return next(new APIerror('Please provide your password reset token.', 400));
        const user = await User.findOne({ passwordResetToken: token });
        if (!user) return next(new APIerror('User with this password reset token does not exist.', 400));
        const checkToken = user.verifyResetToken();
        if (!checkToken) {
            user.passwordResetToken = undefined;
            user.passwordResetTokenValid = undefined;
            await user.save({ validateModifiedOnly: true });
            return next(new APIerror('Token has expired! Send a new one.', 400));
        }

        const { password, passwordRepeat } = req.body;
        if (!password || !passwordRepeat) return next(new APIerror('Please provide your new password and repeat it.', 400));
        user.password = password;
        user.passwordRepeat = passwordRepeat;
        user.passwordResetToken = undefined;
        user.passwordResetTokenValid = undefined;
        await user.save({ validateModifiedOnly: true });
        if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
        res.status(200).cookie('jwt', token, cookieOptions).json({
            status: 'success',
            message: 'Password succesfuly retrieved!'
        })
    }
    catch (err) {
        return next(new APIerror('Something went very wrong!', 500));
    }
}

exports.updateMe = async function (req, res, next) {

    try {

        if (req.body.password || req.body.passwordRepeat) return next(new APIerror('Use /update-password/ route for password changes!', 400));
        if (req.body.role || req.body.passwordResetToken || req.body.passwordResetTokenValid) return next(new APIerror('You cannot assign role to yourself!', 401));
        const user = await User.findByIdAndUpdate(req.user.id, req.body, {
            runValidators: true,
            new: true
        });
        res.status(200).json({
            status: 'success',
            data: {
                data: user
            }
        })
    }
    catch (err) {
        console.log(err);
        return next(new APIerror('Something went very wrong!', 500));
    }
}

exports.updateMyTests = async function (req, res, next) {
    try {
        const addTests = await User.findByIdAndUpdate({ _id: req.user.id }, {
            $addToSet: req.body
        });
        res.status(200).json({
            status: 'success',
            data: {
                data: addTests
            }
        })
    }
    catch (err) {
        console.log(err);
        return next(new APIerror('Something went very wrong!', 500));
    }
}


exports.changePassword = async function (req, res, next) {
    try {
        const { password, passwordNew, passwordRepeat } = req.body;
        if (!password || !passwordNew || !passwordRepeat) return next(new APIerror('You must provide your new password and repeat it.', 400));
        const user = await User.findOne({ _id: req.user.id }).select("+password");
        console.log(user);
        if (!await user.correctPassword(password, user.password)) return next(new APIerror('Incorrect password!', 401));
        user.password = passwordNew;
        user.passwordRepeat = passwordRepeat;
        const tokenNew = signToken(user._id);
        if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
        await user.save({ validateModifiedOnly: true });
        res.status(200).cookie('jwt', tokenNew, cookieOptions).json({
            status: 'success',
            tokenNew,
            message: 'Password changed succesfuly! You may now log in.'
        })
    }
    catch (err) {
        console.log(err);
        return next(new APIerror('Something went very wrong!', 500));
    }
}

exports.deactivateUser = async function (req, res, next) {
    try {

        const user = await User.findByIdAndUpdate(req.user.id, { isActive: false }, {
            runValidators: true,
            new: true
        });
        if (!user) return next(new APIerror('user with this token does not exist!', 401));


        res.status(200).json({
            status: 'success',
            data: null,
            message: 'Your account has been deactivated. You may activate it again any time.'
        })
    }
    catch (err) {
        return next(new APIerror('Something went very wrong!', 500));
    }
}

exports.isLoggedIn = async function (req, res, next) {
    if (req.cookies.jwt) {
        const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
        const currentUser = await User.findById(decoded.id);
        if (!currentUser) {
            return next();
        }
        res.locals.user = currentUser;
        return next();
    }
    next();
}

exports.gradeTest = async function (req, res, next) {
    try {
        const user = await User.findOne({ _id: req.params.userId });
        const getTest = user.submittedTests.find(x => x.id === req.params.testId);
        getTest.graded = req.body.yourGrade
        await user.save({ validateModifiedOnly: true });
        res.status(200).json({
            status: 'success'
        })
    }
    catch (err) {
        console.log(err);
        return next(new APIerror('Something went very wrong!', 500));
    }
}