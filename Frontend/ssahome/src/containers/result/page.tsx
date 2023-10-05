'use client';
import * as React from 'react';
import styles from './page.module.css';
import { Button, ButtonGroup, Card, CardContent, Typography } from '@mui/material';
import Image from 'next/image';
import Graph from './graph';
import History from './history';
import winner from '../../../public/images/free-icon-confetti-4525694.png';
import party from '../../../public/images/free-icon-championship-award-4798145.png';
import congrats from '../../../public/images/congrats.jpg';
import axios from 'axios';
import Link from 'next/link';
import BasicTable from '../main/rankingTable10';


const ResultPage = () => {
  const [report, setReport] = React.useState(true);
  const nickName = localStorage.getItem("nickname");
  const [rank, setRank] = React.useState([]); // 랭크 데이터를 저장할 상태

  let tmp = localStorage.getItem("tmpAccessToken");
  if (tmp) {
    tmp = JSON.parse(tmp);
  }


  React.useEffect(() => {
    axios.get('http://localhost:8080/api/rank')
      .then(response => {
        // axios로 데이터를 가져온 후, 해당 데이터를 rank 상태로 설정
        setRank(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  // localStorage에서 Turns 값 가져오기
  const turns = localStorage.getItem("Turns");

  // turns 값에 따라 랭킹 페이지 컴포넌트 선택
  let RankingPageComponent;

  if (rank && rank.length > 0) {
    if (turns === "10") {
      RankingPageComponent = rank.map((item, index) => (
        <BasicTable key={index} rank={item} />
      ));
    } else if (turns === "15") {
      RankingPageComponent = rank.map((item, index) => (
        <BasicTable key={index} rank={item} />
      ));
    } else if (turns === "20") {
      RankingPageComponent = rank.map((item, index) => (
        <BasicTable key={index} rank={item} />
      ));
    }
  } else {
    // props.rank 배열이 비어있을 때의 처리 (예: 에러 메시지 또는 기본 컴포넌트)
    RankingPageComponent = <div>랭킹 데이터가 없습니다.</div>;
  }

  return (
    <main>
      <div className={styles.title}>
        <Typography sx={{ fontWeight: 'bold', fontFamily: "Dovemayo_gothic" }}>
          <Image src={winner} alt='winner' width={50} /> &nbsp;&nbsp; {nickName}님 총 수익&nbsp;&nbsp;<Image src={winner} alt='winner' className={styles.party} width={50} />
        </Typography>
      </div>
      <div className={styles.body}>
        <div className={styles.main}>
          <Card sx={{ boxShadow: 5 }}>
            <ButtonGroup variant="contained" aria-label="outlined primary button group" sx={{ marginTop: 2 }}>
              <Button sx={{ fontWeight: 'bold', fontFamily: "116angduk_honesty15" }} onClick={() => setReport(true)}>보유 자산 변동 그래프</Button>
              <Button sx={{ fontWeight: 'bold', fontFamily: "116angduk_honesty15" }} onClick={() => setReport(false)}>상세 매매 내역</Button>
            </ButtonGroup>
            {report ? <Graph /> : <History />}

          </Card>
          <div className={styles.footer}>
            <Image
              src={congrats}
              alt='bed'
              height={170}
              className={styles.pic}
              loading="lazy">
            </Image>

          </div>
        </div>
        <div className={styles.main2}>
          <Card sx={{ boxShadow: 5 }}>
            <CardContent className={styles.rankTitle}>
              <Image src={party} alt='party' width={70} className={styles.win} />
              <Typography sx={{ fontWeight: 'bold', fontFamily: "Dovemayo_gothic" }}>{turns} 턴</Typography>
            </CardContent>
            <div className={styles.rank}>
              {RankingPageComponent}
            </div>
            <Link href={'/main'}>
              <Button variant="outlined" sx={{ fontFamily: "Dovemayo_gothic" }} className={styles.finish}>종료</Button>
            </Link>

          </Card>


        </div>
      </div>


    </main>
  );
};

export default ResultPage;