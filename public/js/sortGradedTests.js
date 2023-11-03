'use strict';

export const filterGradedTests = function (inputVal) {

    const allPara = Array.from(document.querySelectorAll('.grade-test'));
    if (!inputVal) allPara.forEach(div => div.style.display = 'flex');

    const names = Array.from(document.querySelectorAll('.test-header'));
    console.log(names);
    for (let i = 0; i < allPara.length; i++) {
        if (!names[i].textContent.toLowerCase().includes(inputVal.toLowerCase())) names[i].parentElement.style.display = 'none';
        else names[i].parentElement.style.display = 'flex';
    }
}
