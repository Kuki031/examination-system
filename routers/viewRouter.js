'use strict';

const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');
const viewRouter = express.Router();

viewRouter.use(authController.isLoggedIn);
viewRouter.get('/', viewController.getAllSubjects);
viewRouter.get('/log-in', viewController.logIn);
viewRouter.get('/me', authController.protect, authController.isLoggedIn, viewController.getMe);
viewRouter.get('/sign-up', viewController.signUp);
viewRouter.get('/teachers', viewController.getAllTeachers);
viewRouter.get('/students', viewController.getAllStudents);
viewRouter.get('/subject-stats', viewController.getStats);
viewRouter.get('/my-tests', viewController.myTests);
viewRouter.get('/grade-tests', viewController.gradeTests);
viewRouter.get('/subjects/:slug', viewController.getSubject);
viewRouter.get('/teachers/:pin', viewController.getTeacher);
viewRouter.get('/tests/:id', viewController.getTest);
viewRouter.get('/edit-tests/:teacherId', viewController.editTests);
viewRouter.get('/new-test/:id', viewController.createNewTest);
viewRouter.get('/update-test/:testId', viewController.updateTest);
module.exports = viewRouter;