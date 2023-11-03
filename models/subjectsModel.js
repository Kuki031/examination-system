'use strict';

const mongoose = require('mongoose');
const slugify = require('slugify');
const subjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "You must provide subject's name!"],
    },
    semester: {
        type: Number,
        required: [true, "You must provide semester in which the subject will be taught."]
    },
    slug: String,
    points: {
        type: Number,
        required: [true, "You must specify the points for the subject."],
        validate: {
            validator: function (el) {
                return el === parseInt(el)
            },
            message: "Points must be an integer type."
        }
    },
    isRequired: {
        type: Boolean,
        required: [true, "You must specify if this subject is required."]
    },
    photo: [String],
    description: {
        type: String,
        required: [true, "You must specify the description of this subject."]
    },
    teachers:
        [{
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: [true, "Subject must belong to a teacher."]
        }],
    assistants: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        }
    ]

}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

subjectSchema.index({ teacher: 1, isRequired: 1 });
subjectSchema.index({ slug: 1 });

subjectSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true })
    next();
})

subjectSchema.pre(/^find/, function (next) {
    this.sort({ semester: 1 })
    next();
})

subjectSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'assistants',
        select: "firstName lastName pin photo"
    })
    next();
})

subjectSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'teachers',
        select: "firstName lastName pin photo"
    })
    next();
})

subjectSchema.virtual('availableTests', {
    ref: 'Test',
    foreignField: 'subject',
    localField: '_id'
})


subjectSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'availableTests',
        select: "testName _id isLocked"
    })
    next();
})


// subjectSchema.virtual('lockedTests', {
//     ref: 'User',
//     localField: '_id',
//     foreignField: 'lockedTests'
// })


// subjectSchema.pre(/^find/, function (next) {
//     this.populate({
//         path: 'lockedTests',
//         select: 'testName _id'
//     })

//     next();
// })


subjectSchema.virtual('startsAt').get(function () {
    if (this.semester === 1 || this.semester === 3 || this.semester === 5) return `${this.name} starts in winter semester.`
    else return `${this.name} starts in summer semester.`
})

const Subject = mongoose.model('Subject', subjectSchema);
module.exports = Subject;