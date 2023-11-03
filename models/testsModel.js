'use strict';

const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
    testName: {
        type: String,
        required: [true, "You must provide the title of the subject."]
    },
    questions: [String],
    maxPoints: {
        type: Number,
        required: [true, "You must provide maximum number of points."],
        validate: {
            validator: function (el) {
                return el === parseInt(el)
            },
            message: "Maximum number of points can only be an integer."
        }
    },
    minPoints: {
        type: Number,
        required: [true, "You must provide minium number of points for passing the test."],
        validate: {
            validator: function (el) {
                return el === parseInt(el)
            },
            message: "Minimum number of points can only be an integer."
        }
    },
    isLocked: Boolean,
    subject: {
        type: mongoose.Schema.ObjectId,
        ref: 'Subject'
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})



const Test = mongoose.model('Test', testSchema);
module.exports = Test;
