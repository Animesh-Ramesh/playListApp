import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

class TempoBarChart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            labels: [],
            tempoValues: [],
        }
    }

    componentDidMount() {
        const tempoValues = this.props.data.map(song =>song.tempo);
        const labels = this.props.data.map(song =>song.title);
        this.setState({
            labels: labels,
            tempoValues: tempoValues
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.data!==this.props.data){
            const tempoValues = this.props.data.map(song =>song.tempo);
            const labels = this.props.data.map(song =>song.title);
            this.setState({
                labels: labels,
                tempoValues: tempoValues
            });
        }
    }

    render() {
        const data = {
            labels: this.state.labels,
            datasets: [
                {
                    label: 'Tempo',
                    data: this.state.tempoValues,
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

export default TempoBarChart;
