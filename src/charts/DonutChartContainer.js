import React, {useEffect} from "react";
import {Doughnut} from "react-chartjs-2";
import {chartColors} from "./colors";
import "./DonutChartContainer.css"
import {IonText} from '@ionic/react';

// Doughnut.defaults.global.legend.display = false;
const TOTALSCORE = 1
const options = {
    legend: {
        display: false,
    },
    labels: {
        display: false
    },
    tooltip: false,
    cutoutPercentage: 85
};

const DonutChartContainer = ({
                                 score
                             }) => {
    const data = {
        maintainAspectRatio: false,
        responsive: false,
        labels: {
            display: false
        },
        tooltip: false,
        datasets: [
            {
                label: "none",
                tooltip: false,
                data: [score / 100, score / 100 - TOTALSCORE],
                backgroundColor: ['#3880ff', '#eaeaea'],
                hoverBackgroundColor: chartColors
            }
        ]
    };

    return (
        <div className='wrapper'>
            <div className="textContainer">
                <IonText className='chart-number'>{score}%</IonText>
                <br/>
                <IonText><b>SLEEP QUALITY</b></IonText>
            </div>
            <Doughnut options={options} data={data} score={score}/>
        </div>
    );
}

export default DonutChartContainer;
