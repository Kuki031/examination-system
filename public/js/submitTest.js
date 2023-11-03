'use strict';

export const updateTestArray = async function (data, testId) {
    try {
        const res = await axios({
            method: 'POST',
            url: `http://127.0.0.1:8080/api/v1/users/update-tests/${testId}`,
            data: data
        });
        if (res.data.status === 'success') {
            alert('Test submitted succesfully. You will be redirected shortly.');
            setTimeout(() => {
                window.location.assign('/');
            }, 1500);
        }
    }
    catch (err) {
        alert(err.response);
    }
}
