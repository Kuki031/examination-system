'use strict';

const handlerFactory = require('../utils/handlerFactory');
const Subject = require('../models/subjectsModel');
const APIerror = require('../utils/APIerror');

exports.getAllSubjects = handlerFactory.getAllRes(Subject);
exports.getSubject = handlerFactory.getResById(Subject, 'subject', { path: 'availableTests' });
exports.createSubject = handlerFactory.createRes(Subject);
exports.updateSubject = handlerFactory.updateRes(Subject, 'subject');
exports.deleteSubject = handlerFactory.deleteRes(Subject, 'subject');

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
        res.status(200).json({
            status: 'success',
            data: {
                stats: stats
            }
        })
    }
    catch (err) {
        return next(new APIerror('Something went very wrong!', 500));
    }
}
