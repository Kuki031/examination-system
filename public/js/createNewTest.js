'use strict';


export const createTestForSubject = async function (data, subId) {
    const user = document.querySelector('#userCreateId').textContent;
    try {
        const res = await axios({
            method: 'POST',
            url: `http://127.0.0.1:8080/api/v1/subjects/${subId}/availableTests`,
            data: data
        });
        if (res.data.status === 'success') {
            alert('Test created successfuly!');
            location.reload(true);
            window.location.assign(`/edit-tests/${user}`)
        }
    }
    catch (err) {
        alert(err.response);
    }
}
const createNewQuestion = function () {
    const questionsDiv = document.querySelector('.questions--div');
    const html = `
        <input type="text" class="questions" placeholder="Question"><button class="removeQ">Remove question</button>
    `

    questionsDiv.insertAdjacentHTML('beforeend', html);
}

const addQBtn = document.querySelector('#addQ');
if (addQBtn) {
    addQBtn.addEventListener('click', () => {
        createNewQuestion();
        const questionsDiv = document.querySelector('.questions--div');
        if (questionsDiv) {
            questionsDiv.addEventListener('click', function (e) {
                const mainEl = e.target;
                if (!mainEl.classList.contains('removeQ')) return;
                const input = mainEl.previousElementSibling;
                questionsDiv.removeChild(input);
                questionsDiv.removeChild(mainEl);

            })
        }
    })
}
