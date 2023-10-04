'use client';

import * as React from 'react';
import { Line } from 'react-chartjs-2';
import styles from './page.module.css';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import axios from 'axios';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
    },
};

const Graph = () => {
    const [graphData, setGraphData] = React.useState({
        labels: [],
        datasets: [
            {
                label: '수익률',
                data: [],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    });

    React.useEffect(() => {
        const apiURl = process.env.apiUrl;
        axios.get(apiURl + '/gameLog/list') // URL 수정
            .then((response) => {
                const gameLogs = response.data;
                const labels = gameLogs.map((log) => log.region);
                const data = gameLogs.map((log) => log.rate); // rate로 수정

                setGraphData({
                    labels,
                    datasets: [
                        {
                            label: '수익률',
                            data,
                            borderColor: 'rgb(255, 99, 132)',
                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        },
                    ],
                });
            })
            .catch((error) => {
                console.error('Error fetching graph data:', error);
            });
    }, []);
    return (
        <main className={styles.graph}>
            <Line options={options} data={graphData} />
        </main>
    );
};

export default Graph;