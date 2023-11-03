'use strict';

const User = require('../models/userModel');
const handlerFactory = require('../utils/handlerFactory');




exports.deleteUsers = handlerFactory.deleteRes(User, 'user');
exports.getAllUsers = handlerFactory.getAllRes(User);
exports.getUsersById = handlerFactory.getResById(User, 'user');
exports.updateUserById = handlerFactory.updateRes(User, 'user');
exports.getMe = async function (req, res, next) {
    await User.findById(req.user.id);
    req.params.id = req.user.id;
    next();
}
