import Chart from 'chart.js/auto';
import { useEffect } from 'react';


/**
 * Renders a bar chart component that displays the count of IMDB ratings in each range.
 * 
 * @param {object} props - The component props containing the ratings array.
 * @param {array} ratings - An array of IMDB ratings to display in the bar chart.
 * @returns {JSX.Element} A canvas element containing the rendered bar chart.
 * @usedIn Person
 * @reference ChatGPT, W3Schools
*/
export default function BarChart(props) {
    const { ratings } = props;
    const range = ["0-1", "1-2", "2-3", "3-4", "4-5", "5-6", "6-7", "7-8", "8-9", "9-10"];

    useEffect(() => {
        if (ratings.length > 0) {
            const data = Array.from({ length: 10 }, (_, i) => {
                const start = i;
                const end = i + 1;
                return ratings.filter(rating => rating >= start && rating < end).length;
            });

            const Ratings = new Chart("Ratings", {
                type: "bar",
                data: {
                    labels: range,
                    datasets: [{
                        label: "IMDB Rating Count",
                        data,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }]
                },
                options: {}
            });

            return () => {
                Ratings.destroy();
            };
        }
    }, [ratings, range]);

    return (
        <canvas id="Ratings" style={{ width: "100%" }}></canvas>
    );
}