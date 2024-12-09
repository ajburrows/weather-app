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

// Map utc day to a day of the week
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

    // Return true if the index represents the entry for the current time of day and false otherwise
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


    // Return the hour of the entry at the given index
    function getHourOfIndex(index){
        return times[index].getUTCHours()
    }

    // Returns the day of the week (e.g. "Mon")
    function getDayOfIndex(index){
        return datesDictionary[times[index].getUTCDay()]
    }

    // Set the bolded top text of the tooltip that pops up when hovering over a datapoint
    function getLabelString(timesEntry){
        const entryArr = timesEntry.toUTCString().split(" ")
        entryArr[entryArr.length - 1] = "EST" // Change GMT to EST
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
                    // Draw vertical lines to mark the start of each day and the current time
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

        // Add a title to the graph that displays the city and state e.g. Seattle, WA
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
            tension: 0.2, // smooth the curve
            pointRadius: 2, // size of the data points
            hoverRadius: 5 // how close cursor is to trigger the tooltip
        }]
    };

    return (
        <div className='line-graph-container'>
        <Line data={data} options={options}/>
        </div>
    );
};

export default TempLineGraph;