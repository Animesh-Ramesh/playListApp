import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

class AccousticBarChart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            labels: [],
            acousticnessValues: [],
        }
    }

    componentDidMount() {
        const acousticnessValues = this.props.data.map(song =>song.acousticness);
        const labels = this.props.data.map(song =>song.title);
        this.setState({
            labels: labels,
            acousticnessValues: acousticnessValues,
        });
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.data!==this.props.data){
            const acousticnessValues = this.props.data.map(song =>song.acousticness);
            const labels = this.props.data.map(song =>song.title);
            this.setState({
                labels: labels,
                acousticnessValues: acousticnessValues,
            });
        }
    }

    render() {
        const data = {
            labels: this.state.labels,
            datasets: [
                {
                    label: 'Acousticness',
                    data: this.state.acousticnessValues,
                    backgroundColor: "rgba(0,123,255, 0.6)",
                    borderColor: "rgba(0,123,255, 0.2)",
                    borderWidth: 1
                }
            ]
        };
        const options = {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        };
        return (
            <div>
                <div className="chart-container">
                    <Bar
                        data={data}
                        options={options}
                    />
                </div>
            </div>
        )
    }
}

export default AccousticBarChart;
