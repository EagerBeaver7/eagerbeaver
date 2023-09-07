import CelebrationIcon from '@mui/icons-material/Celebration';

import * as React from 'react';
import styles from './page.module.css';
import { Button, ButtonGroup, Card, CardContent, Typography } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import RankList from './rank';
import Image from 'next/image';
import Graph from './graph';
import History from './history';

const ResultPage = () => {
  return (
    <main>
      <div className={styles.title}>
        <CelebrationIcon />
        <Typography>님 총 수익</Typography>
        <CelebrationIcon className={styles.party} />
      </div>
      <div className={styles.main}>
        <Card>
          <ButtonGroup variant="contained" aria-label="outlined primary button group">
            <Button >보유 자산 변동 그래프</Button>
            <Button>상세 매매 내역</Button>
          </ButtonGroup>
          <Graph />
          <History />
        </Card>
        <Card>
          <CardContent className={styles.rankTitle}>
            <EmojiEventsIcon />
            <Typography>랭킹</Typography>
          </CardContent>

          <RankList />
        </Card>
      </div>
      <div className={styles.footer}>
        <Image
          src={`https://images.unsplash.com/photo-1549388604-817d15aa0110`}
          alt='bed'
          width={600}
          height={100}
          className={styles.pic}
          loading="lazy">
        </Image>
        <Button className={styles.finish}>종료</Button>
      </div>

    </main>
  );
};

export default ResultPage;