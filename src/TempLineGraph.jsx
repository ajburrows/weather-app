import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale, // Register the "Category" scale
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

//TODO: accept temperature and time inputs
//[65, 59, 80, 81, 56, 72]
//['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']

const TempLineGraph = ({ temperatures, times }) => {

    function getHourOfIndex(index){
        const timestamp = JSON.stringify(times[index])
        const time = timestamp.split("T")[1]
        const hour = time.split(":")[0]
        return parseInt(hour)
    }

    function getDayOfIndex(index){
        const timestamp = JSON.stringify(times[index])
        const date = timestamp.split("T")[0]
        const monthDay = date.substring(6)
        return monthDay
    }

    const options = {
        scales: {
            x: {
                ticks: {
                    callback: (value, index) => (getHourOfIndex(index) % 24 === 0 ? getDayOfIndex(index) : ''),
                },
            },
        },
    };

    const data = {
        labels: times,
        datasets: [
        {
            label: 'Temperatures (F)',
            data: temperatures,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.2,
            pointRadius: 2,
            hoverRadius: 4
        }]
    };

    return (
        <div className='line-graph-container'>
        <Line data={data} options={options}/>
        </div>
    );
};

export default TempLineGraph;