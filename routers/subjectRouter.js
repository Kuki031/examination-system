'use strict';

const express = require('express');
const subjectController = require('../controllers/subjectController');
const authController = require('../controllers/authController');
const subjectRouter = express.Router();
const testRouter = require('./testRouter');


subjectRouter.use('/:subjectId/availableTests', testRouter);
subjectRouter.route('/').get(subjectController.getAllSubjects).post(authController.protect, authController.restrict('admin'), subjectController.createSubject);
subjectRouter.route('/get-stats').get(authController.protect, authController.restrict('admin'), subjectController.getStats);
subjectRouter.route('/:id').get(subjectController.getSubject).patch(authController.protect, authController.restrict('teacher', 'assistant'), subjectController.updateSubject).delete(authController.protect, authController.restrict('admin'), subjectController.deleteSubject);

module.exports = subjectRouter;