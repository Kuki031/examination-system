'use strict';


const delDiv = document.querySelector('.questions-edit-div');
if (delDiv)
    delDiv.addEventListener('click', (e) => {
        const mainEl = e.target;
        if (!mainEl.classList.contains('removeQ-edit')) return;
        const input = mainEl.previousElementSibling;
        delDiv.removeChild(input);
        delDiv.removeChild(mainEl);
    })

export const editTest = async function (data, testId) {
    try {
        const userId = document.querySelector('#userId').textContent;
        const res = await axios({
            method: 'PATCH',
            url: `http://127.0.0.1:8080/api/v1/tests/${testId}`,
            data: data
        });
        if (res.data.status === 'success') {
            alert('Test changed successfuly!');
            setTimeout(() => {
                location.reload(true);
                window.location.assign(`/edit-tests/${userId}`)
            }, 1500)
        }
    }
    catch (err) {
        alert(err.message);
    }
}

export const deleteTest = async function (data = null, testId) {
    try {
        const userId = document.querySelector('#userId').textContent;
        const res = await axios({
            method: 'DELETE',
            url: `http://127.0.0.1:8080/api/v1/tests/${testId}`,
            data
        });
        if (res.data.status === 'success') {
            alert('Test deleted successfuly. You will be redirected shortly.');
            setTimeout(() => {
                location.reload(true);
                window.location.assign(`/edit-tests/${userId}`)
            }, 1500)
        }
    }
    catch (err) {
        alert(err.message);
    }
}

const editQuestion = function () {
    const questionsDiv = document.querySelector('.questions-edit-div');
    const html = `
            <input type="text" class="questions-edit" placeholder="Question"><button class="removeQ-edit">Remove question</button>
        `

    questionsDiv.insertAdjacentHTML('beforeend', html);
}

const editQbtn = document.querySelector('#addQ-edit');
if (editQbtn) {
    editQbtn.addEventListener('click', () => {
        editQuestion();
        const del = document.querySelector('.questions-edit-div');
        if (del)
            del.addEventListener('click', (e) => {
                const mainEl = e.target;
                if (!mainEl.classList.contains('removeQ-edit')) return;
                const input = mainEl.previousElementSibling;
                del.removeChild(input);
                del.removeChild(mainEl);
            })
    })
}
