import React from "react";
import styles from "./page.module.css";
import RankingTable10 from "@/containers/main/rankingTable10";

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

const RankingPage10 = (props: RankingPageProps) => {
  return (
    <div className={styles.rankmidleContent}>
      <div className={styles.rankCenter}>10턴</div>
      <br></br>
      <RankingTable10 rank={props.rank}></RankingTable10>
    </div>
  );
};

export default RankingPage10;
