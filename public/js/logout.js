'use strict';

export const logOut = async function () {
    try {
        const res = await axios({
            method: 'GET',
            url: `http://127.0.0.1:8080/api/v1/users/log-out`
        });
        if (res.data.status === 'success') {
            window.location.assign('/');
        }
    }
    catch (err) {
        console.log(err.response);
    }
}
