/**
 * Displays the information related to a movie fetched from the API.
 * Includes: title, year, genres, countries, box-office, plot, and poster.
 * 
 * @param {Object} props movie
 * @returns {JSX.Element} Formatted information relating to the given movie.
 * @usedIn Movie.jsx
 */
export default function MovieComponent(props) {
    const { movie } = props;

    const badgeColors = {
        Action: "#8B0000",
        Adult: "#1c1c1c",
        Adventure: "#AC5B27",
        Animation: "#000FF0",
        Biography: "#6495ED",
        Comedy: "#EC8F55",
        Crime: "#2C175C",
        Documentary: "#8FBC8F",
        Drama: "#008080",
        Family: "#6D1464",
        Fantasy: "#DAA520",
        History: "#004d00",
        "Sci-Fi": "#838F9C",
        Thriller: "#8E8E8E",
        Romance: "#E5007A",
        Horror: "#660000",
        Music: "#C7A743",
        Musical: "#9f8535",
        Mystery: "#674ea7",
        Sport: "#38761d",
        Western: "#89481f",
        War: "#000000"
    };
    const asDollars = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    });

    return (
        <div className="movie-container">
            <div className="movie-info">
                <h2> {movie.title} </h2>
                <p> Released in: {movie.year}</p>
                <p className="genre-container">
                    Genres:&nbsp;
                    {movie.genres && movie.genres.map((genre, index) => (
                        <span key={index} style={{ backgroundColor: badgeColors[genre], padding: "5px", marginRight: "5px", borderRadius: "8px" }}>
                            {genre}
                        </span>
                    ))}
                </p>
                <p>{movie.country.includes(", ") ? "Countries: " : "Country: "} {movie.country}</p>
                <p> Box Office: {asDollars.format(movie.boxoffice)} </p>
                <p>
                    {movie.plot}
                </p>
                <p className="movie-rating">
                    {movie.ratings.map((rating, index) => (
                        <span key={index} style={{ marginRight: "15px" }}>
                            {rating.source === "Internet Movie Database"
                                ? `IMDB: ${rating.value ? rating.value + "/10" : "None"}`
                                : `${rating.source}: ${rating.value ? rating.value + "%" : "None"}`}
                        </span>
                    ))}
                </p>
            </div>
            <div className="movie-poster">
                {<img src={movie.poster} alt="Poster" />}
            </div>
        </div>
    )
};