'use strict';

export const updateSettings = async function (data) {
    try {
        const res = await axios({
            method: 'PATCH',
            url: `http://127.0.0.1:8080/api/v1/users/update-me`,
            data: data
        });
        if (res.data.status === 'success') {
            alert('Profile updated succesfuly!');
        }
        console.log(data);
    }
    catch (err) {
        alert(err.message)
    }
}

