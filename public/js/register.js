'use strict';

export const getValues = async function (firstName, lastName, pin, email, password, passwordRepeat, phoneNumber) {
    try {
        const res = await axios({
            method: 'POST',
            url: `http://127.0.0.1:8080/api/v1/users/sign-up`,
            data: {
                firstName,
                lastName,
                pin,
                email,
                password,
                passwordRepeat,
                phoneNumber
            }
        });
        if (res.data.status === 'success') {
            alert('Signed up successfully!');
            window.setTimeout(() => {
                location.assign('/');

            }, 1500);
        }
    }
    catch (err) {
        console.log(err);
        alert(err.response.data.message);
    }
}
