'use client';
import * as React from 'react';
import styles from './page.module.css';
import { Button, ButtonGroup, Card, CardContent, Typography } from '@mui/material';
import Image from 'next/image';
import Graph from './graph';
import History from './history';
import winner from '../../../public/images/free-icon-confetti-4525694.png';
import party from '../../../public/images/free-icon-championship-award-4798145.png';
import profit from '../../../public/images/image 39.png';
import axios from 'axios';
import RankingPage15 from '../main/ranking15';
import RankingPage10 from '../main/ranking10';
import RankingPage20 from '../main/ranking20';

const Ranking10 = () => (
  <RankingPage10 />
);

const Ranking15 = () => (
  <RankingPage15 />
);

const Ranking20 = () => (
  <RankingPage20 />
);

const ResultPage = () => {
  const [report, setReport] = React.useState(true);

  const nickName = localStorage.getItem("nickname");

  let tmp = localStorage.getItem("tmpAccessToken");
  if (tmp) {
    tmp = JSON.parse(tmp);
  }
  const accessToken = tmp;

  const handleRedis = () => {
    axios.delete('http://localhost:8080/api/gameLog', {
      headers: { Authorization: `Bearer ${accessToken}` }
    }).then(response => {
      console.log(response.data);
    });
  }

  // localStorage에서 Turns 값 가져오기
  const turns = localStorage.getItem("Turns");
  let RankingComponent;

  // Turns 값에 따라 적절한 Ranking 컴포넌트 선택
  if (turns === "10") {
    RankingComponent = Ranking10;
  } else if (turns === "15") {
    RankingComponent = Ranking15;
  } else if (turns === "20") {
    RankingComponent = Ranking20;
  } else {
    // 기본값 설정 (원하는 기본값으로 변경 가능)
    RankingComponent = Ranking10;
  }

  return (
    <main>
      <div className={styles.title}>
        <Typography>
          <Image src={winner} alt='winner' width={30} /> &nbsp;&nbsp; {nickName}님 총 수익&nbsp;&nbsp;<Image src={winner} alt='winner' className={styles.party} width={30} />
        </Typography>
      </div>
      <div className={styles.body}>
        <div className={styles.main}>
          <Card sx={{ boxShadow: 3 }}>
            <ButtonGroup variant="contained" aria-label="outlined primary button group" sx={{ marginTop: 2 }}>
              <Button onClick={() => setReport(true)}>보유 자산 변동 그래프</Button>
              <Button onClick={() => setReport(false)}>상세 매매 내역</Button>
            </ButtonGroup>
            {report ? <Graph /> : <History />}

          </Card>
          <div className={styles.footer}>
            <Image
              src={profit}
              alt='bed'
              height={170}
              className={styles.pic}
              loading="lazy">
            </Image>

          </div>
        </div>
        <Card sx={{ boxShadow: 3 }}>
          <CardContent className={styles.rankTitle}>
            <Typography><Image src={party} alt='party' width={30} />랭킹</Typography>
          </CardContent>
          <div className={styles.rank}>
            <RankingComponent />

          </div>
          <Button onClick={() => { handleRedis() }} variant="outlined" className={styles.finish}>종료</Button>
        </Card>
      </div>


    </main>
  );
};

export default ResultPage;