/**
 * Fetches a list of movies from the Internet Movie Database.
 *
 * @param {Object} props Set of states: query, year, setRowData.
 * @returns {Promise} A promise that resolves with the movies object.
 *
 * @usedIn SearchBar
*/
export default function FetchJSON(props) {
    const { query, year, setRowData, setPagination } = props;
    let url = `http://sefdb02.qut.edu.au:3000/movies/search`

    try {
        if (year !== "") {
            url = `http://sefdb02.qut.edu.au:3000/movies/search?title=${query}&year=${year}`;
        } else {
            url = `http://sefdb02.qut.edu.au:3000/movies/search?title=${query}`;
        }
    } catch {
        url = `http://sefdb02.qut.edu.au:3000/movies/search`;
    }

    return fetch(url) 
        .then(response => { return response.json() })
        .then(data => {
            const movies = data.data.map(movie => ({
                    title: movie.title,
                    year: movie.year,
                    imdbID: movie.imdbID,
                    imdbRating: movie.imdbRating,
                    rottenTomatoesRating: movie.rottenTomatoesRating,
                    metacriticRating: movie.metacriticRating,
                    classification: movie.classification,
            }));
            setRowData(movies);
            setPagination(data.pagination);
        })
}