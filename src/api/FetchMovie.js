import API_URL from '../components/Config.js'

/**
 * Fetches a movie with the given ID.
 *
 * @param {string} imdbID The Internet Movie Database ID of the movie to fetch.
 * @returns {Promise} A promise that resolves with the movie object.
 *
 * @usedIn Movie
*/
export default function FetchMovie(imdbID) {
    let url = API_URL + `/movies/data/${imdbID}`;

    return fetch(url)
        .then(response => {
            return response.json() })
        .then(movie => {
            return movie;
        });
}