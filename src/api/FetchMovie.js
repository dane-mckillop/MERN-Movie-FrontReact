/**
 * Fetches a movie with the given ID.
 *
 * @param {string} imdbID The Internet Movie Database ID of the movie to fetch.
 * @returns {Promise} A promise that resolves with the movie object.
 *
 * @usedIn Movie
*/
export default function FetchMovie(imdbID) {
    let url = `http://sefdb02.qut.edu.au:3000/movies/data/${imdbID}`;

    return fetch(url)
        .then(response => {
            return response.json() })
        .then(movie => {
            return movie;
        });
}