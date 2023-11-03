'use strict';


const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const transformString = require('../utils/transformStr');


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "You must provide your first name!"],
        validate: {
            validator: function (el) {
                return el.match(/^[A-Za-z ]+$/);
            },
            message: "First name can only contain alphabet characters."
        }
    },
    lastName: {
        type: String,
        required: [true, "You must provide your last name!"],
        validate: {
            validator: function (el) {
                return el.match(/^[A-Za-z ]+$/);
            },
            message: "Last name can only contain alphabet characters."
        }
    },
    pin: {
        type: String,
        required: [true, "You must provide your Personal Identification Number(PIN)!"],
        unique: true,
        validate: {
            validator: function (el) {
                return el.match(/^[0-9]*$/)
            },
            message: "Personal Identification Number(PIN) can only contain digits!"
        },
        minLength: 11,
        maxLength: 11,
        select: false
    },
    email: {
        type: String,
        required: [true, "You must provide your e-mail adress!"],
        validate: [validator.isEmail, "Invalid e-mail adress format."],
        unique: true
    },
    password: {
        type: String,
        required: [true, "You must provide your password!"],
        minLength: 10,
        select: false
    },
    passwordRepeat: {
        type: String,
        required: [true, "You must repeat your password!"],
        validate: {
            validator: function (el) {
                return el === this.password
            },
            message: "Passwords do not match!"
        }
    },
    photo: {
        type: String,
        default: "Photo is not provided."
    },
    phoneNumber: {
        type: String,
        required: [true, "You must provide your phone number!"],
        unique: true,
        validate: {
            validator: function (el) {
                return el.match(/^[0-9]*$/)
            },
            message: "Phone number can only contain digits."
        },
        minLength: 10,
        maxLength: 10
    },
    role: {
        type: String,
        default: "student"
    },
    passwordResetToken: String,
    passwordResetTokenValid: Date,
    isActive: {
        type: Boolean,
        default: true
    },
    subjects: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Subject'
        }
    ],
    submittedTests: [
        {
            type: {
                type: String
            },
            name: String,
            questions: [String],
            answer: String,
            graded: String,
            submittedBy: String,
            subject: String
        }
    ],
    lockedTests: [String]


}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})


userSchema.pre('save', function (next) {
    this.firstName = transformString(this.firstName);
    this.lastName = transformString(this.lastName);
    next();
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordRepeat = undefined;
    next();
})

userSchema.methods.correctPassword = async function (providedPW, PW) {
    return await bcrypt.compare(providedPW, PW);
}

userSchema.methods.createPasswordResetToken = function () {
    this.passwordResetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetTokenValid = (Date.now() + 10 * 60 * 1000);
}

userSchema.methods.verifyResetToken = function () {
    return this.passwordResetTokenValid > Date.now();
}


userSchema.pre(/^find/, function (next) {
    this.find({ isActive: { $ne: false } });
    next();
})

userSchema.pre(/^find/, function (next) {
    this.sort("firstName");
    next();
})




const User = mongoose.model('User', userSchema);
module.exports = User;
