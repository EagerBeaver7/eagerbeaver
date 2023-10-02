import React from "react";
import styles from "./page.module.css";
import RankingTable15 from "@/containers/main/rankingTable15";

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
  rank: Props; // Props 타입의 배열을 data 속성으로 받음
}

const RankingPage15 = (props: RankingPageProps) => {
  return (
    <div className={styles.rankmidleContent}>
      <div className={styles.rankCenter}>15턴</div>
      <br></br>
      <RankingTable15 rank={props.rank}></RankingTable15>
    </div>
  );
};

export default RankingPage15;
