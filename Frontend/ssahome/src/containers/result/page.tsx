'use client';
import * as React from 'react';
import styles from './page.module.css';
import { Button, ButtonGroup, Card, CardContent, Typography } from '@mui/material';
import RankList from './rank';
import Image from 'next/image';
import Graph from './graph';
import History from './history';
import winner from '../../../public/images/free-icon-confetti-4525694.png';
import party from '../../../public/images/free-icon-championship-award-4798145.png';
import profits from "../../../public/images/image 39.png";

const ResultPage = () => {
  const [report, setReport] = React.useState(true);

  return (
    <main>
      <div className={styles.title}>
        <Typography>
          <Image src={winner} alt='winner' width={30} />님 총 수익<Image src={winner} alt='winner' className={styles.party} width={30} />
        </Typography>
      </div>
      <div className={styles.main}>
        <Card sx={{ boxShadow: 3 }}>
          <ButtonGroup variant="contained" aria-label="outlined primary button group" sx={{ marginTop: 2 }}>
            <Button onClick={() => setReport(true)}>보유 자산 변동 그래프</Button>
            <Button onClick={() => setReport(false)}>상세 매매 내역</Button>
          </ButtonGroup>
          {report ? <Graph /> : <History />}

        </Card>
        <Card sx={{ boxShadow: 3 }}>
          <CardContent className={styles.rankTitle}>
            <Typography><Image src={party} alt='party' width={30} />랭킹</Typography>
          </CardContent>
          <RankList />
        </Card>
      </div>
      <div className={styles.footer}>
        <Image
          src={profits}
          alt='bed'
          width={600}
          height={130}
          className={styles.pic}
          loading="lazy">
        </Image>
        <Button variant="outlined" className={styles.finish}>종료</Button>
      </div>

    </main>
  );
};

export default ResultPage;