import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styles from "./page.module.css";

interface RankingPageProps {
  rank: {
    turn: number;
    rankList: {
      userName: string;
      rate: number;
    }[];
  }; // Props 타입의 배열을 data 속성으로 받음
}

export default function BasicTable(props: RankingPageProps) {
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ width: "300px", height: "20%", spacing: 5 }}
        aria-label="simple table"
      >
        <TableBody>
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
  );
}
