import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import * as React from 'react';
import styles from './page.module.css';
import axios from 'axios';

interface GameLog {
    id: string;
    region: string;
    tradeNum: number;
    buyPrice: number;
    sellPrice: number;
    rate: number;
}

const History = () => {
    const [gameLogs, setGameLogs] = React.useState<GameLog[]>([]);

    React.useEffect(() => {
        // API 요청을 보내고 데이터를 가져옵니다.
        axios.get('http://localhost:8080/api/gameLog/list')
            .then((response) => {
                // API 응답 데이터를 gameLogs 상태로 설정합니다.
                setGameLogs(response.data);
            })
            .catch((error) => {
                console.error('Error fetching game logs:', error);
            });
    }, []);

    return (
        <main className={styles.table}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 50 }} aria-label="simple table">
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
                        {/* {gameLogs.map((row, index) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center">{index + 1}</TableCell>
                                <TableCell align="center" component="th" scope="row">
                                    {row.region}
                                </TableCell>
                                <TableCell align="center">{row.tradeNum}</TableCell>
                                <TableCell align="center">{row.buyPrice}</TableCell>
                                <TableCell align="center">{row.sellPrice}</TableCell>
                                <TableCell align="center">{row.rate}</TableCell>
                            </TableRow>
                        ))} */}
                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="center">1</TableCell>
                            <TableCell align="center" component="th" scope="row">
                                파주시
                            </TableCell>
                            <TableCell align="center">5</TableCell>
                            <TableCell align="center">302</TableCell>
                            <TableCell align="center">-</TableCell>
                            <TableCell align="center">0</TableCell>
                        </TableRow>
                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="center">2</TableCell>
                            <TableCell align="center" component="th" scope="row">
                                강남구
                            </TableCell>
                            <TableCell align="center">9</TableCell>
                            <TableCell align="center">623</TableCell>
                            <TableCell align="center">-</TableCell>
                            <TableCell align="center">0</TableCell>
                        </TableRow>
                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="center">3</TableCell>
                            <TableCell align="center" component="th" scope="row">
                                수연구
                            </TableCell>
                            <TableCell align="center">3</TableCell>
                            <TableCell align="center">138</TableCell>
                            <TableCell align="center">-</TableCell>
                            <TableCell align="center">0</TableCell>
                        </TableRow>
                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="center">4</TableCell>
                            <TableCell align="center" component="th" scope="row">
                                강남구
                            </TableCell>
                            <TableCell align="center">1</TableCell>
                            <TableCell align="center">740</TableCell>
                            <TableCell align="center">-</TableCell>
                            <TableCell align="center">0</TableCell>
                        </TableRow>
                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="center">5</TableCell>
                            <TableCell align="center" component="th" scope="row">
                                파주시
                            </TableCell>
                            <TableCell align="center">5</TableCell>
                            <TableCell align="center">-</TableCell>
                            <TableCell align="center">3020</TableCell>
                            <TableCell align="center">10%</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </main>
    );
};

export default History;