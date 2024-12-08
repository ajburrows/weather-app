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
  Legend,
  plugins
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
        const time = times[index]
        return time.split(" ")[1].substring(0,2)
    }

    function getDayOfIndex(index){
        const time = times[index]
        return time.split(" ")[0].substring(0,5)
    }


    const options = {
        scales: {
            x: {
                ticks: {
                    // Only place a label on the horizontal axis if the time is 00:00
                    callback: (value, index) => (getHourOfIndex(index) % 24 === 0 ? getDayOfIndex(index) : ''),
                    autoSkip: false,
                },
                grid:{
                    // Only draw a vertical line on the chart background if a label is there
                    drawOnChartArea: true,
                    color: (context) => {
                        return context.tick && context.tick.label ? 'rgba(0,0,0,0.1)' : null
                    }
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