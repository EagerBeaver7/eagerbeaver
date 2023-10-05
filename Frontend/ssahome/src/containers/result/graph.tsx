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
import { faker } from '@faker-js/faker';

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

const labels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];


export const data = {
    labels,
    datasets: [
        {
            label: '자산(씨드)',
            data: [0, 0, 0, 0.1, 0.1, 0.1, 0.34, 0.34, -0.1, 0],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
    ],
};

const Graph = () => {
    return (
        <main className={styles.graph}>
            <Line options={options} data={data} />
        </main>
    );
};

export default Graph;