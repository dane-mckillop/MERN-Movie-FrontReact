import API_URL from '../components/Config.js'

/**
 * Refreshes a user with the given email and password.
 *
 * @typedef {string} LocalStorageToken The old refresh token to be refreshed.
 * @returns {Promise} A promise that resolves to a new token and new refresh token.
 *
 * @usedIn App
*/
export default function RefreshUser() {
    return getRefreshToken().then(refreshToken => {
        return fetch(API_URL + `/user/refresh`, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ refreshToken: refreshToken }),
        })
            .then((res) =>
                res.json().then((res) => {
                    localStorage.setItem("token", res.bearerToken.token);
                    localStorage.setItem("refreshToken", res.refreshToken.token);
                })
            )
            .catch((error) => {
                console.log(error.message);
            });
    });
}

/*
 *Retrieves the refreshToken from local storage.
 *Not exported for security
*/
async function getRefreshToken() {
    await new Promise(resolve => setTimeout(resolve, 50));
    return localStorage.getItem("refreshToken");
}