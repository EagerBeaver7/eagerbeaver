import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
  ranking: number,
  profile: string,
  nickname: string,
  earningRate: number,
) {
  return { ranking, profile, nickname,earningRate};
}

const rows = [
  createData(1, "url", "구민석", 100),
  createData(2, "url", "민석구", -50),
  createData(3, "url", "koo", 25),
];

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ width: '10%', height:'10%',spacing: 10}} aria-label="simple table">
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.ranking}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.ranking}
              </TableCell>
              <TableCell align="right">{row.profile}</TableCell>
              <TableCell align="right">{row.nickname}&nbsp;(님)</TableCell>
              <TableCell align="right">{row.earningRate}&nbsp;(%)</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}