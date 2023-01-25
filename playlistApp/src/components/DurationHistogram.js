import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

class DurationHistogram extends Component {
    constructor(props) {
        super(props);
        this.state = {
            durationData: {},
            options: {
                scales: {
                    x: {
                        type: "category",
                        offset: false,
                        gridLines: {
                            offsetGridLines: false
                        },
                        title: {
                            display: true,
                            text: "Duration (Seconds)"
                        },
                        barPercentage: 1, // sets the width of each bar to 100%
                        categoryPercentage: 1 // sets the space between each bar to 0%
                    },
                    y: {
                        type: "linear",
                        gridLines: {
                            offsetGridLines: false
                        },
                        title: {
                            display: true,
                            text: "Frequency"
                        }
                    },
                }
            }
        };
    }


    componentDidMount() {
        const songDurations = this.props.data.map((song) => song.duration_ms / 1000);
        const histogramData = this.getHistogramData(songDurations);
        this.setState({durationData: histogramData});
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.data!==this.props.data){
            const songDurations = this.props.data.map((song) => song.duration_ms / 1000);
            const histogramData = this.getHistogramData(songDurations);
            this.setState({durationData: histogramData});
        }
    }

    getHistogramData = (data) => {
        let min = Math.min(...data);
        let max = Math.max(...data);
        let binSize = Math.ceil((max - min) / 10);
        let histogram;
        let labels;
        if(binSize === 0){
            binSize = 1;
            histogram = Array(1).fill(0);
            labels = Array(1).fill().map((_, i) => { return (min + (i) * binSize) + " - " + (min + (i + 1) * binSize)});
            data.forEach((val) => {
                let bin = Math.floor((val - min) / binSize);
                histogram[bin] = histogram[bin] + 1;
            });
        }
        else{
            histogram = Array(10).fill(0);
            labels = Array(10).fill().map((_, i) => { return (min + (i) * binSize) + " - " + (min + (i + 1) * binSize)});
            data.forEach((val) => {
                let bin = Math.floor((val - min) / binSize);
                histogram[bin] = histogram[bin] + 1;
            });
        }
        return {labels, histogram};
    }

    render() {
        return (
            <div className="App">
                <Bar
                    data={{
                        labels: this.state.durationData.labels,
                        datasets: [
                            {
                                data: this.state.durationData.histogram,
                                label: 'Number of Song',
                                backgroundColor: "rgba(0,123,255, 0.6)",
                                borderColor: "rgba(0,123,255, 0.2)",
                                lineTension: 0,
                                fill: false,
                                borderJoinStyle: "round",
                                borderWidth: 0.2,
                                barPercentage: 1,
                                categoryPercentage: 1,
                                barThickness: "flex"
                            }
                        ]
                    }}
                    options={this.state.options}
                />
            </div>
        );
    }
}
export default DurationHistogram;

