import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import * as React from 'react';
import styles from './page.module.css';

function createData(
    region: string,
    num: number,
    buy: number,
    sell: number,
    profit: number,
) {
    return { region, num, buy, sell, profit };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const History = () => {
    return (
        <main className={styles.table}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#C2C3C5', opacity: 0.5 }}>
                            <TableCell align="center">No</TableCell>
                            <TableCell align="center">지역</TableCell>
                            <TableCell align="center">수량</TableCell>
                            <TableCell align="center">매입가</TableCell>
                            <TableCell align="center">매매가</TableCell>
                            <TableCell align="center">수익률</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.region}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center">1</TableCell>
                                <TableCell align="center" component="th" scope="row">
                                    {row.region}
                                </TableCell>
                                <TableCell align="center">{row.num}</TableCell>
                                <TableCell align="center">{row.buy}</TableCell>
                                <TableCell align="center">{row.sell}</TableCell>
                                <TableCell align="center">{row.profit}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </main>
    );
};

export default History;