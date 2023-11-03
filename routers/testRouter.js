'use strict';

const express = require('express');
const authController = require('../controllers/authController');
const testController = require('../controllers/testController');
const testRouter = express.Router({ mergeParams: true });

testRouter.route('/').get(testController.getAllTests).post(authController.protect, authController.restrict('teacher'), testController.setTestsSubjectIds, testController.createTest);
testRouter.route('/:id').get(testController.getTest).patch(authController.protect, authController.restrict('teacher', 'assistant'), testController.updateTest).delete(authController.protect, authController.restrict('admin', 'teacher'), testController.deleteTest);


module.exports = testRouter;