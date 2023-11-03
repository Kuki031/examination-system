'use strict';

export const updatePW = async function (data) {
    try {
        const res = await axios({
            method: 'PATCH',
            url: `http://127.0.0.1:8080/api/v1/users/update-password`,
            data: data
        });
        if (res.data.status === 'success') {
            alert('Password changed successfuly!');
        }
        console.log(data);
    }
    catch (err) {
        alert(err.response.message)
    }
}
