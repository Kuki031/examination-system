'use strict';

const Test = require('../models/testsModel');
const handlerFactory = require('../utils/handlerFactory');


exports.setTestsSubjectIds = (req, res, next) => {
    if (!req.body.subject) req.body.subject = req.params.subjectId;
    if (!req.body.user) req.body.user = req.user.id;
    next();
}


exports.getAllTests = handlerFactory.getAllRes(Test);
exports.getTest = handlerFactory.getResById(Test, 'test');
exports.createTest = handlerFactory.createRes(Test);
exports.updateTest = handlerFactory.updateRes(Test, 'test');
exports.deleteTest = handlerFactory.deleteRes(Test, 'test');