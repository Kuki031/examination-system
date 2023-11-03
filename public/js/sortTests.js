'use strict';

export const filterTests = function (inputVal) {

    const allPara = Array.from(document.querySelectorAll('.my-tests-div div'));
    if (!inputVal) allPara.forEach(div => div.style.display = 'flex');

    const names = allPara.map(x => x.firstElementChild);
    for (let i = 0; i < allPara.length; i++) {
        if (!names[i].textContent.toLowerCase().includes(inputVal.toLowerCase())) names[i].parentElement.style.display = 'none';
        else names[i].parentElement.style.display = 'flex';
    }
}
