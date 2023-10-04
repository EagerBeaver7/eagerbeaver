import React, { useState } from "react";
import styles from "./page.module.css";
import { Button } from "@mui/material";
import Ranking15 from "@/containers/main/ranking15";
import Ranking10 from "@/containers/main/ranking10";
import Ranking20 from "@/containers/main/ranking20";
import { BsTrophy } from "react-icons/bs";

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
  const [isTen, setIsTen] = useState(true);
  const [isFif, setIsFif] = useState(false);
  const [isTwen, setIsTwen] = useState(false);

  const onTwen = () => {
    setIsTwen(true);
  };

  const onFif = () => {
    setIsFif(true);
  };

  const onTen = () => {
    setIsTen(true);
  };

  const offTen = () => {
    setIsTen(false);
  };

  const offFif = () => {
    setIsFif(false);
  };

  const offTwen = () => {
    setIsTwen(false);
  };

  return (
    <div className={styles.rankbar}>
      <div className={styles.rankTitle}>
        <BsTrophy size="50px" color="#ffbf00" />
        <div>
          <div className={styles.rankContainerTxt}>누가누가 잘하나</div>
        </div>
        <div className={styles.empty}>

        </div>
      </div>
      <div className={styles.rankContainer}>
        <Button
          onClick={() => {
            if (isTen) {
              onTwen();
              offTen();
            } else if (isFif) {
              onTen();
              offFif();
            } else if (isTwen) {
              onFif();
              offTwen();
            }
          }}
          className={[styles.arrow, styles.arrowLeft].join(" ")}
        ></Button>
        <div className={isTen ? styles.rankCenter : styles.changeTurn}>
          <Ranking10 rank={props.rank[0]}></Ranking10>
        </div>
        <div className={isFif ? styles.rankCenter : styles.changeTurn}>
          <Ranking15 rank={props.rank[1]}></Ranking15>
        </div>
        <div className={isTwen ? styles.rankCenter : styles.changeTurn}>
          <Ranking20 rank={props.rank[2]}></Ranking20>
        </div>
        <Button
          onClick={() => {
            if (isTen) {
              onFif();
              offTen();
            } else if (isFif) {
              onTwen();
              offFif();
            } else if (isTwen) {
              onTen();
              offTwen();
            }
          }}
          className={[styles.arrow, styles.arrowRight].join(" ")}
        ></Button>
      </div>
    </div>
  );
};

export default RankingPage;
