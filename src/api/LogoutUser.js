import API_URL from '../components/config.js'

/**
 * Logs out the currently logged in user.
 * 
 * @returns {Promise} A promise that resolves after the user is logged out.
 * @usedIn NavBar, Home
*/
export default function LogoutUser() {
    return getRefreshToken().then(refreshToken => {
        return fetch(API_URL + `/user/logout`, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ refreshToken: refreshToken })
        })
            .then(() => {
                console.log("Successfully logged out.");
            })
            .catch((error) => {
                window.alert("Error logging out");
                console.error(error);
            })
            .finally(() => {
                localStorage.removeItem("token");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("loginTime");
                localStorage.removeItem("email");
            });
    });
}

/*
 *Retrieves the refreshToken from local storage.
 *Not exported for security
*/
async function getRefreshToken() {
    await new Promise(resolve => setTimeout(resolve, 100));
    return localStorage.getItem("refreshToken");
}