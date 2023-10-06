import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styles from "./page.module.css";
import { FaMedal } from "react-icons/fa";

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
  const checkWinner = (idx: number) => {
    if (idx === 1) {
      return (
        <TableCell align="right" className={styles.check2}>
          <FaMedal size="20px" color="#ffbf00" />
        </TableCell>
      );
    } else if (idx === 2) {
      return (
        <TableCell align="right" className={styles.check2}>
          <FaMedal size="20px" color="#c0c0c0" />
        </TableCell>
      );
    } else if (idx === 3) {
      return (
        <TableCell align="right" className={styles.check2}>
          <FaMedal size="20px" color="#800000" />
        </TableCell>
      );
    } else {
      return (
        <TableCell align="right" className={styles.check2}>
          {idx}위
        </TableCell>
      );
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ width: "400px", height: "20%", spacing: 10 }}
        aria-label="simple table"
      >
        <TableBody>
          {props.rank && props.rank.rankList ? (
            props.rank.rankList.map((row, idx) => (
              <TableRow
                key={idx + 1}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {checkWinner(idx + 1)}
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
