'use strict';

import { filterList } from "/js/sortSubjects.js";
import { filterTeachers } from "./sortTeachers.js";
import { createTestForSubject } from "./createNewTest.js"
import { editTest, deleteTest } from "./editTest.js";
import { updateSettings } from "./updateSettings.js";
import { updatePW } from "./updatePw.js";
import { getValues } from "./register.js";
import { logOut } from "./logout.js";
import { getValue } from "./login.js";
import { updateTestArray } from "./submitTest.js";
import { filterTests } from "./sortTests.js";
import { filterGradedTests } from "./sortGradedTests.js";
import { gradeTest } from "./gradeTest.js";
const inputSubjects = document.querySelector('.search__input');

if (inputSubjects)
    inputSubjects.addEventListener('keyup', function () {
        filterList(inputSubjects.value);
    })

const inputTeachers = document.querySelector('#search__teacher');

if (inputTeachers)
    inputTeachers.addEventListener('keyup', function () {
        filterTeachers(inputTeachers.value);
    })

const inputTests = document.querySelector('#search-test');
if (inputTests)
    inputTests.addEventListener('keyup', function (e) {
        e.preventDefault();
        filterTests(inputTests.value);
    })


const inputGradedTests = document.querySelector('#search-graded-test');
if (inputGradedTests)
    inputGradedTests.addEventListener('keyup', function (e) {
        e.preventDefault();
        filterGradedTests(inputGradedTests.value);
    })

const createTestBtn = document.querySelector('#createTestBtn');
if (createTestBtn)
    createTestBtn.addEventListener('click', () => {
        let check = true;
        const subId = document.querySelector('#subId').textContent;
        const isLocked = document.querySelector('#isLockedCreation').checked;
        const testName = document.querySelector('#testName').value;
        const questions = Array.from(document.querySelectorAll('.questions')).map(x => x.value);
        const maxPoints = document.querySelector('#maxPoints').value;
        const minPoints = document.querySelector('#minPoints').value;
        questions.forEach(question => {
            if (!question) {
                check = false;
                return alert('Empty question.');
            }
        })
        if (check)
            createTestForSubject({
                testName,
                questions,
                maxPoints,
                minPoints,
                isLocked
            }, subId)

    })

const deleteTestBtn = document.querySelector('#deleteTest');
if (deleteTestBtn)
    deleteTestBtn.addEventListener('click', () => {
        const confirmDeletion = prompt("Would you like to delete this test?(Y/N)");
        if (confirmDeletion === 'Y' || confirmDeletion === 'y') {
            const id = document.querySelector('#testId').textContent;
            deleteTest({}, id);
        } else return alert("Changes have not been made.");

    })
const editTestBtn = document.querySelector('#updateTestBtn');
if (editTestBtn)
    editTestBtn.addEventListener('click', () => {
        let check = true;
        const id = document.querySelector('#testId').textContent;
        const isLocked = document.querySelector('#locked').checked;
        const testName = document.querySelector('#testName').value;
        const questions = Array.from(document.querySelectorAll('.questions-edit')).map(x => x.value);
        const maxPoints = document.querySelector('#maxPoints').value;
        const minPoints = document.querySelector('#minPoints').value;
        questions.forEach(question => {
            if (!question) {
                check = false;
                return alert('Empty question.');
            }
        })
        if (check)
            editTest({
                testName,
                questions,
                maxPoints,
                minPoints,
                isLocked
            }, id)

    })

const updateBtn = document.querySelector('#savechanges');
if (updateBtn)
    updateBtn.addEventListener('click', () => {
        const firstName = document.querySelector('#firstName').value;
        const lastName = document.querySelector('#lastName').value;
        const email = document.querySelector('#emailChange').value;
        const phoneNumber = document.querySelector('#phoneNumber').value;
        updateSettings({
            firstName,
            lastName,
            email,
            phoneNumber
        })
    })

const changePwBtn = document.querySelector('#savechangepw');
if (changePwBtn)
    changePwBtn.addEventListener('click', () => {
        const password = document.querySelector('#passwordCurrent').value;
        const passwordNew = document.querySelector('#passwordChange').value;
        const passwordRepeat = document.querySelector('#passwordRepeatChange').value;
        updatePW({
            password,
            passwordNew,
            passwordRepeat
        })
    })

const regForm = document.querySelector('.reg__form');
if (regForm)
    regForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const firstName = document.querySelector('#firstName').value;
        const lastName = document.querySelector('#lastName').value;
        const pin = document.querySelector('#pin').value;
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;
        const passwordRepeat = document.querySelector('#passwordRepeat').value;
        const phoneNumber = document.querySelector('#phone').value;

        getValues(firstName, lastName, pin, email, password, passwordRepeat, phoneNumber);
    })


const logOutbtn = document.querySelector('#logOut');
if (logOutbtn)
    logOutbtn.addEventListener('click', () => {
        logOut();
    })

const form = document.querySelector('.login__form');
if (form)
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;
        getValue(email, password);
    })

const submitBtn = document.querySelector('#submit-test');
if (submitBtn)
    submitBtn.addEventListener('click', () => {
        let check = prompt("Would you like to submit your test and finish the examination process?(Y/y)");
        if (check === 'Y' || check === 'y') {
            const id = document.querySelector('#testSlug').textContent;
            const testId = document.querySelector('#tId').textContent;
            const questions = Array.from(document.querySelectorAll('.q-paragraph')).map(x => x.textContent);
            const answer = document.querySelector('#answerSheet').value;
            const name = document.querySelector('#testName').textContent;
            const submittedBy = document.querySelector('#loggedUser').textContent;
            updateTestArray({
                submittedTests: {
                    questions,
                    answer,
                    name,
                    graded: false,
                    submittedBy,
                    subject: id
                },
                lockedTests: testId
            }, testId)
        } else return alert('Changes have not been made.');
    })

const gradeTestDiv = Array.from(document.querySelectorAll('.grade-test'));
if (gradeTestDiv)
    gradeTestDiv.forEach(x => {
        x.addEventListener('click', (e) => {
            e.preventDefault();
            if (!e.target.classList.contains('grade')) return;
            const testId = x.querySelector('.gradedTestId').textContent;
            const userId = x.querySelector('.studentId').textContent;
            let confirm;
            switch (e.target.textContent) {
                case "1":
                    confirm = '1';
                    break;
                case "2":
                    confirm = '2';
                    break;

                case "3":
                    confirm = '3';
                    break;
                case "4":
                    confirm = '4';
                    break;
                case "5":
                    confirm = '5';
                    break;
                default: 0
            }
            const confirmPrompt = prompt(`Are you sure about grading this test with the grade of ${confirm}(Y/N)?`);
            if (confirmPrompt === 'Y' || confirmPrompt === 'y') {
                gradeTest({
                    yourGrade: confirm
                }, userId, testId)
            } else return alert('Changes have not been made.')
        })
    })



