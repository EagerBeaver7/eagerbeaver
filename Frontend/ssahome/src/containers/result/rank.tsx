import { ImageList, ImageListItem, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import Image from 'next/image';
import * as React from 'react';
import styles from './page.module.css';

interface ranking {
    userName: string;
    rate: number;
}

interface RankListProps {
    rank: ranking[];
}

function RankList(props: RankListProps) {
    return (
        <main className={styles.rank}>
            <TableContainer component={Paper}>
                <Table sx={{ width: '100%', height: '20%', spacing: 10 }} aria-label="simple table">
                    <TableBody >
                        {props.rank && props.rank.rankList ? (
                            props.rank.rankList.map((row, idx) => (
                                <TableRow
                                    key={idx + 1}
                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                >
                                    <TableCell align="right" className={styles.check2}>
                                        {idx + 1}위
                                    </TableCell>
                                    <TableCell align="right" className={styles.check2}>
                                        {row.userName}&nbsp;(님)
                                    </TableCell>
                                    <TableCell align="right" className={styles.check2}>
                                        {row.rate}&nbsp;(%)
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={2}>
                                    데이터가 로드 중이거나 없습니다.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </main>


    );
};

export default RankList;

