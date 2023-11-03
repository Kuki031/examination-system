'use strict';

const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const userRouter = express.Router();




userRouter.route('/').get(authController.protect, authController.restrict('admin'), userController.getAllUsers);
userRouter.route('/me').get(authController.protect, userController.getMe, userController.getUsersById);
userRouter.route('/sign-up').post(authController.signUp);
userRouter.route('/log-in').post(authController.logIn);
userRouter.route('/log-out').get(authController.protect, authController.isLoggedIn, authController.logOut);
userRouter.route('/forgot-password').patch(authController.forgotPassword);
userRouter.route('/update-me').patch(authController.protect, authController.isLoggedIn, authController.updateMe);
userRouter.route('/update-password').patch(authController.protect, authController.isLoggedIn, authController.changePassword);
userRouter.route('/deactivate-me').patch(authController.protect, authController.isLoggedIn, authController.deactivateUser);
userRouter.route('/update-tests/:id').post(authController.protect, authController.isLoggedIn, authController.updateMyTests);
userRouter.route('/reset-password/:token').patch(authController.resetPassword);
userRouter.route('/:id').get(userController.getUsersById).delete(authController.protect, authController.restrict('admin'), userController.deleteUsers).patch(authController.protect, authController.restrict('admin', 'teacher'), userController.updateUserById);
userRouter.route('/graded-test/:userId/:testId').patch(authController.gradeTest);
module.exports = userRouter;
