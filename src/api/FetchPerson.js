import API_URL from '../components/Config.js'

/**
 * Fetches a person with the given ID.
 *
 * @param {string} personID The ID of the person to fetch.
 * @returns {Promise} A promise that resolves with the person object.
 *
 * @usedIn Person
*/
export default function FetchPerson(personID) {
    return getBearerToken().then((token) => {
            return fetch(API_URL + `/people/${personID}`, {
                method: 'GET',
                headers: {
                    'accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            })
                .then(response => {
                    return response.json()
                })
                .then(person => {
                    return person;
                });
        })
        .catch((error) => {
            console.error(error);
        });
}

//Not exported for security
async function getBearerToken() {
    await new Promise(resolve => setTimeout(resolve, 50));
    return localStorage.getItem("token");
}