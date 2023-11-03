'use strict';

export const gradeTest = async function (data, userId, testId) {
    try {
        const res = await axios({
            method: 'PATCH',
            url: `http://127.0.0.1:8080/api/v1/users/graded-test/${userId}/${testId}`,
            data: data
        });
        if (res.data.status === 'success') {
            alert('Test graded succesfully. You will be redirected shortly.')
            setTimeout(() => {
                location.reload(true);
                window.location.assign('/grade-tests')
            }, 1500);
        }
    }
    catch (err) {
        console.error(err.response)
    }
}
