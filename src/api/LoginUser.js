import API_URL from '../components/config.js'

/**
 * Logs in a user with the given email and password.
 *
 * @param {string} email The email of the user to log in.
 * @param {string} password The password of the user to log in.
 * @returns {Promise} A promise that resolves with no value if the login is successful.
 *
 * @usedIn LoginWindow
*/
export default function LoginUser(email, password) {

    return fetch(API_URL + `/user/login`, {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, password: password }),
    })
        .then((res) =>
            res.json().then((res) => {
                localStorage.setItem("token", res.bearerToken.token);
                localStorage.setItem("refreshToken", res.refreshToken.token);
                localStorage.setItem("email", email);
            })
        )
        .catch((error) => {
            console.log(error.message);
            window.alert("Login Failed. Please ensure details are correct.")
        });
};