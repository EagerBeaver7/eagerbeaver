import React, { useState } from "react";
import styles from "./page.module.css";
import RankingTable10 from "@/containers/main/rankingTable10";
import RankingTable15 from "@/containers/main/rankingTable15";
import RankingTable20 from "@/containers/main/rankingTable20";
// import { Button } from "@mui/material";

// Props 타입 정해주기
// rankList에 들어갈 요소들
interface ranking {
  userName: string;
  rate: number;
}

// props type 지정
interface Props {
  turn: number;
  rankList: ranking[];
}

interface RankingPageProps {
  rank: Props[]; // Props 타입의 배열을 data 속성으로 받음
}

const RankingPage = (props: RankingPageProps) => {
  // const [isPre, setIsPre] = useState(true);

  // const togglePre = () => {
  //   setIsPre((isPre) => !isPre);
  // };

  return (
    <div className={styles.rankbar}>
      <div className={styles.rankContainerTxt}>누가누가 잘하나</div>
      <div className={styles.rankContainer}>
        <div className={styles.rankleftContent}>
          {/* <Button
            onClick={() => togglePre()}
            className={[styles.arrow, styles.arrowLeft].join(" ")}
          >
          </Button> */}
          <div className={styles.rankCenter}>10턴</div>
          {/* <div className="arrow arrow-right"></div> */}
          <br></br>
          <RankingTable10 rank={props.rank[0]}></RankingTable10>
          {/* 여기서 rank=는? 자식 컴포넌트에 rank로 받을 key?가 있는지 확인해야함 */}
        </div>
        <div className={styles.rankmidleContent}>
          <div className={styles.rankCenter}>15턴</div>
          <br></br>
          <RankingTable15 rank={props.rank[1]}></RankingTable15>
        </div>
        <div className={styles.rankrightContent}>
          <div className={styles.rankCenter}>20턴</div>
          <br></br>
          <RankingTable20 rank={props.rank[2]}></RankingTable20>
        </div>
      </div>
    </div>
  );
};

export default RankingPage;
