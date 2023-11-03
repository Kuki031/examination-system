'use strict';

const Subject = require('../models/subjectsModel');
const User = require('../models/userModel');
const Test = require('../models/testsModel');
const APIerror = require('../utils/APIerror');
exports.getAllSubjects = async function (req, res, next) {
    try {
        const subjects = await Subject.find();
        res.status(200).set('Content-Security-Policy', "frame-src 'self'").render('subjects', {
            status: 'success',
            subjects: subjects
        })
    }
    catch (err) {
        return next(new APIerror('Something went very wrong.', 500));
    }
}

exports.getSubject = async function (req, res, next) {
    try {
        const subject = await Subject.findOne({ slug: req.params.slug }).populate({
            path: 'availableTests',
            select: "testName _id isLocked"
        });
        res.status(200).set('Content-Security-Policy', "frame-src 'self'").render('subject', {
            status: 'success',
            subject: subject
        })
    }
    catch (err) {
        console.log(err.stack);
        return next(new APIerror('Something went very wrong.', 500));
    }
}

exports.getTeacher = async function (req, res, next) {
    try {
        const teacher = await User.findOne({ pin: req.params.pin }).populate({
            path: 'subjects',
            select: "name slug"
        });
        res.status(200).set('Content-Security-Policy', "frame-src 'self'").render('teacher', {
            status: 'success',
            teacher: teacher
        })
    }
    catch (err) {
        return next(new APIerror('Something went very wrong.', 500));
    }
}

exports.getAllTeachers = async function (req, res, next) {
    try {
        const teachers = await User.find({ $or: [{ role: 'teacher' }, { role: 'assistant' }] }).select("+pin");
        res.status(200).set('Content-Security-Policy', "frame-src 'self'").render('teachers', {
            status: 'success',
            teachers: teachers
        })
    }
    catch (err) {
        return next(new APIerror('Something went very wrong.', 500));
    }
}

exports.logIn = async function (req, res, next) {
    try {
        res.set('Content-Security-Policy', "frame-src 'self'").render('login', {
            status: 'success'
        })
    }
    catch (err) {
        return next(new APIerror('Something went very wrong.', 500));
    }
}

exports.signUp = async function (req, res, next) {
    res.status(201).set('Content-Security-Policy', "frame-src 'self'").render('register', {
        status: 'success'
    })
}

exports.getMe = async function (req, res, next) {
    try {
        const me = await User.findById(req.user).populate({
            path: 'subjects',
            select: "name slug"
        });
        res.status(200).set('Content-Security-Policy', "frame-src 'self'").render('myaccount', {
            me: me,
            status: 'success',
            title: 'My settings'
        });
    }
    catch (err) {
        return next(new APIerror('Something went very wrong.', 500));
    }
}

exports.getAllStudents = async function (req, res, next) {
    try {
        const students = await User.find({ role: 'student' });
        res.status(200).set('Content-Security-Policy', "frame-src 'self'").render('students', {
            students,
            status: 'success'
        })
    }
    catch (err) {
        return next(new APIerror('Something went very wrong.', 500));
    }
}

exports.getStats = async function (req, res, next) {
    try {
        const stats = await Subject.aggregate([
            {
                $group: {
                    _id: "$semester",
                    subjects: { $push: "$name" },
                    numOfSubjects: { $count: {} },
                    minPointsSubject: { $min: "$points" },
                    count: { $sum: "$isRequired" },
                    numOfRequiredSubjects: { $sum: 1 },
                    maxPointsSubject: { $max: "$points" }
                }
            },
            {
                $addFields: { semester: '$_id' }
            },
            {
                $sort: { _id: 1 }
            },
            {
                $project: {
                    count: 0, _id: 0
                }
            }
        ])
        res.status(200).set('Content-Security-Policy', "frame-src 'self'").render('stats', {
            stats,
            status: 'success'
        })
    }
    catch (err) {
        return next(new APIerror('Something went very wrong!', 500));
    }
}

exports.getTest = async function (req, res, next) {
    try {
        const test = await Test.findById(req.params.id);
        const testId = req.params.id;
        res.status(200).set('Content-Security-Policy', "frame-src 'self'").render('test', {
            test,
            testId,
            status: 'success'
        })
    }
    catch (err) {
        return next(new APIerror('Something went very wrong!', 500));
    }
}

exports.createNewTest = async function (req, res, next) {
    try {
        const subject = await Subject.findById(req.params.id);
        res.status(200).set('Content-Security-Policy', "frame-src 'self'").render('newTest', {
            status: 'success',
            subject
        })
    }
    catch (err) {
        return next(new APIerror('Something went very wrong!', 500));
    }
}

exports.editTests = async function (req, res, next) {
    try {
        const subjects = await Subject.find({ teachers: req.params.teacherId });
        res.status(200).set('Content-Security-Policy', "frame-src 'self'").render('editTest', {
            stauts: 'success',
            subjects
        })
    }
    catch (err) {
        return next(new APIerror('Something went very wrong!', 500));
    }
}
exports.updateTest = async function (req, res, next) {
    try {
        const test = await Test.findById(req.params.testId);
        res.status(200).set('Content-Security-Policy', "frame-src 'self'").render('testOptions', {
            stauts: 'success',
            test
        })
    }
    catch (err) {
        return next(new APIerror('Something went very wrong!', 500));
    }
}

exports.myTests = async function (req, res, next) {
    try {
        const me = await User.findOne(res.locals.user);
        res.status(200).set('Content-Security-Policy', "frame-src 'self'").render('myTests', {
            status: 'success',
            me
        })
    }
    catch (err) {
        return next(new APIerror('Something went very wrong!', 500));
    }
}

exports.gradeTests = async function (req, res, next) {
    try {
        const tests = await User.aggregate([
            {
                $match: { role: 'student' }
            },
            {
                $unwind: "$submittedTests"
            },

        ])
        res.status(200).set('Content-Security-Policy', "frame-src 'self'").render('gradeTests', {
            status: 'success',
            tests
        })
    }
    catch (err) {
        return next(new APIerror('Something went very wrong!', 500));
    }
}
