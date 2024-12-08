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

//TODO: get current date and time, and render a vertical line on the graph to mark that point
const datesDictionary = {
    0: "Sun",
    1: "Mon",
    2: "Tue",
    3: "Wed",
    4: "Thur",
    5: "Fri",
    6: "Sat"
}


const TempLineGraph = ({ temperatures, times, city, state }) => {

    function isPresentTime(index){
        const dateObj = new Date()
        const year = dateObj.getFullYear()
        const month = dateObj.getMonth()
        const date = dateObj.getDate()
        const hour = dateObj.getHours()

        // timestamp of the entry at times[index]
        const entryTimeStr = times[index].getUTCFullYear() + " " +
                             times[index].getUTCMonth() + " " + 
                             times[index].getUTCDate() + " " + 
                             times[index].getUTCHours()
        
        // timestamp of the date object
        const dateTimeStr = `${year} ${month} ${date} ${hour}`
        
        return entryTimeStr == dateTimeStr
    }


    function getHourOfIndex(index){
        // add 5 for Eastern Time
        return times[index].getUTCHours()
    }

    function getDayOfIndex(index){
        return datesDictionary[times[index].getUTCDay()]
    }

    function getLabelString(timesEntry){
        const entryArr = timesEntry.toUTCString().split(" ")
        entryArr[entryArr.length - 1] = "EST"
        return entryArr.join(" ")
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
                        if (isPresentTime(context.index) === true){
                            return 'rgba(0,168,220,0.5)'
                        }
                        if (context.tick && context.tick.label){
                            return 'rgba(0,0,0,0.1)'
                        }
                        return null
                    }
                },
            },
        },
        plugins: {
            title: {
                display: true,
                text: `${city}, ${state}`,
                font: {
                    size: 20,
                    family: "Inter"
                },
                padding: {
                    top: 10,
                }
            }
        }
    };

    const data = {
        labels: times.map(time => getLabelString(time)),
        datasets: [
        {
            label: 'Temperatures (F)',
            data: temperatures,
            fill: false,
            borderColor: 'rgba(25,118,210, 0.8)',
            backgroundColor: 'rgba(25,118,210, 0.2)',
            tension: 0.2,
            pointRadius: 2,
            hoverRadius: 5
        }]
    };

    return (
        <div className='line-graph-container'>
        <Line data={data} options={options}/>
        </div>
    );
};

export default TempLineGraph;