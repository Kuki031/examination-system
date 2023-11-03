'use strict';

const APIerror = require("./APIerror");
const APIfeatures = require('./APIfeatures');

exports.createRes = function (Model) {
    return async function (req, res, next) {
        try {
            const resource = await Model.create(req.body);
            res.status(201).json({
                status: 'success',
                data: {
                    data: resource
                }
            })
        }
        catch (err) {
            console.log(err);
            return next(new APIerror('Something went very wrong.', 500));
        }
    }
}


exports.getAllRes = function (Model) {
    return async function (req, res, next) {
        try {
            let filter = {};
            if (req.params.subjectId) filter = { subject: req.params.subjectId };
            const features = new APIfeatures(Model.find(filter), req.query).filter().sort().project().paginate();
            const resources = await features.model;
            res.status(200).json({
                status: 'success',
                dataLength: resources.length,
                data: {
                    data: resources
                }
            })
        }
        catch (err) {
            return next(new APIerror('Something went very wrong.', 500));
        }
    }
}

exports.getResById = function (Model, docName, popOpt) {
    return async function (req, res, next) {
        try {
            let query = Model.findById(req.params.id);
            if (popOpt) query = query.populate(popOpt);
            const resource = await query;
            if (!resource) return next(new APIerror(`${docName} with this id does not exist.`, 400));
            res.status(200).json({
                status: 'success',
                data: {
                    data: resource
                }
            })
        }
        catch (err) {
            return next(new APIerror('Something went very wrong.', 500));
        }
    }
}

exports.updateRes = function (Model, docName) {
    return async function (req, res, next) {
        try {
            const resource = await Model.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true });
            if (!resource) return next(new APIerror(`You cannot update ${docName} with this id "${req.params.id}" because it does not exist!`, 400));
            res.status(200).json({
                status: 'success',
                data: {
                    data: resource
                }
            })
        }
        catch (err) {
            return next(new APIerror('Something went very wrong.', 500));
        }
    }
}

exports.deleteRes = function (Model, docName) {
    return async function (req, res, next) {
        try {
            const resource = await Model.findByIdAndDelete(req.params.id);
            if (!resource) return next(new APIerror(`You cannot delete ${docName} with this id "${req.params.id}" because it does not exist!`, 400));
            res.status(200).json({
                status: 'success',
                data: null,
                message: 'Document deleted succesfully!'
            })
        }
        catch (err) {
            return next(new APIerror('Something went very wrong.', 500));
        }
    }
}
