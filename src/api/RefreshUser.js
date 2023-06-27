/*
*/
export default function RefreshUser() {
    return getRefreshToken().then(refreshToken => {
        return fetch(`http://sefdb02.qut.edu.au:3000/user/refresh`, {
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

//Not exported for security
async function getRefreshToken() {
    await new Promise(resolve => setTimeout(resolve, 50));
    return localStorage.getItem("refreshToken");
}