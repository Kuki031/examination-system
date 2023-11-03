'use strict';

export const getValue = async function (email, password) {
    try {
        const res = await axios({
            method: 'POST',
            url: `http://127.0.0.1:8080/api/v1/users/log-in`,
            data: {
                email,
                password
            }
        });
        if (res.data.status === 'success') {
            alert('Logged in successfully!');
            window.setTimeout(() => {
                location.assign('/');

            }, 1500);
        }
    }
    catch (err) {
        alert(err.response.data.message);
    }
}
