/**
 * Registers a new user with the given email and password.
 *
 * @param {string} email - The email of the user to register.
 * @param {string} password - The password of the user to register.
 * @returns {Promise} A promise that resolves with no value if registration is successful.
 *
 * @usedIn RegistrationWindow
*/
export default function RegisterUser(email, password) {
    return fetch(`http://sefdb02.qut.edu.au:3000/user/register`, {
        method: "POST",
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, password: password }),
    })
        .then((res) => {
            if (res.status === 201) {
                console.log("User successfully created. Please login.");
                window.alert("User successfully created. Please login.");
            } else if (res.status === 409) {
                console.log("User already exists. Please try again.");
                window.alert("User already exists. Please try again.");
            } else {
                console.log("Something went wrong. Please try again later.");
                window.alert("Something went wrong. Please try again later.");
            }
        })
        .catch((error) => {
            console.log("Error: ", error);
        });
};