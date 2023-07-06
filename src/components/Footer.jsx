/**
 * The footer component. Rendered by App for every page.
 * Includes copyright information and provides natural padding.
 * 
 * @returns {JSX.Element} Footer element containing copyright information.
*/
export default function Footer() {
    return (
        <footer>
            <span>
                All data is from IMDB, Metacritic and RottenTomatoes.
                <br />
                &copy; 2023 Dane Mckillop{" "}
            </span>
        </footer>
    );
}
