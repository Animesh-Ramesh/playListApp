    import React, { Component } from 'react';
    import { Scatter } from 'react-chartjs-2';
    import { Chart, registerables } from 'chart.js';
    Chart.register(...registerables);

    class DanceabilityScatterChart extends Component {
        constructor(props) {
            super(props);
            this.state = {
                data: {
                    datasets: [{
                        label: 'Danceability',
                        data: [],
                        backgroundColor: "rgba(0,123,255, 0.6)",
                        borderColor: "rgba(0,123,255, 0.2)",
                        pointRadius: 5,
                        pointHoverRadius: 8,
                    }]
                },
                options: {
                    scales: {
                        y: {
                            type: 'linear',
                            scaleLabel: {
                                display: true,
                                labelString: 'Danceability'
                            },
                            title: {
                                display: true,
                                text: 'Danceability'
                            }
                        },
                        x: {
                            type: 'category',
                            position: 'bottom',
                            scaleLabel: {
                                display: true,
                                labelString: 'Song'
                            },
                            title: {
                                display: true,
                                text: 'Song'
                            },
                        },
                    }
                }
            }
        }

        componentDidMount() {
            let songData = this.props.data.map((song) => {
                return {
                    x: song.title,
                    y:song.danceability
                }
            });
            this.setState((prevState) => ({
                data: {
                    ...prevState.data,
                    datasets: [{
                        ...prevState.data.datasets[0],
                        data: songData
                    }]
                }
            }));;
        }
        componentDidUpdate(prevProps, prevState, snapshot) {
            if(prevProps.data!==this.props.data){
                let songData = this.props.data.map((song) => {
                    return {
                        x: song.title,
                        y:song.danceability
                    }
                });
                this.setState((prevState) => ({
                    data: {
                        ...prevState.data,
                        datasets: [{
                            ...prevState.data.datasets[0],
                            data: songData
                        }]
                    }
                }));
            }
        }

        render() {
            return (
                <div>
                    <Scatter data={this.state.data} options={this.state.options} />
                </div>
            )
        }
    }
    export default DanceabilityScatterChart;