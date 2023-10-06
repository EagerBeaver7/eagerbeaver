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


const turns = localStorage.getItem("Turns");
let turnNumber: number;

if (turns === "10") {
  turnNumber = 0;
} else if (turns === "15") {
  turnNumber = 1;
} else if (turns === "20") {
  turnNumber = 2;
}

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

const ResultPage = (props: RankingPageProps) => {
  const [report, setReport] = React.useState(true);
  const [rank, setRank] = React.useState([]); // 랭크 데이터를 저장할 상태

  const [nickName, setNickName] = React.useState<string>('');
  const [GameTurns, setGameTurns] = React.useState<number>(10);
  const [GameTime, setGameTime] = React.useState<number>(60);
  const [tmpAccessToken, setTmpAccessToken] = React.useState<string | null>(null);

  React.useEffect(() => {
    // localStorage에서 GameTurns 값을 가져옵니다.
    const storedGameTurns = localStorage.getItem('Turns');
    if (storedGameTurns !== null) {
      setGameTurns(parseInt(storedGameTurns, 10));
    }

    // localStorage에서 GameTime 값을 가져옵니다.
    const storedGameTime = localStorage.getItem('Time');
    if (storedGameTime !== null) {
      setGameTime(parseInt(storedGameTime, 10));
    }

    // localStorage에서 tmpAccessToken 값을 가져와서 상태에 설정합니다.
    const storedTmpAccessToken = localStorage.getItem('tmpAccessToken');
    if (storedTmpAccessToken !== null) {
      try {
        setTmpAccessToken(JSON.parse(storedTmpAccessToken));
      } catch (error) {
        console.error("Error parsing tmpAccessToken JSON:", error);
      }
    }

    const storedNickname = localStorage.getItem('nickname');
    if (storedNickname !== null) {
      try {
        setNickName(JSON.parse(storedNickname));
      } catch (error) {
        console.error("Error parsing nickname:", error);
      }
    }
  }, []);
  const accessToken = tmpAccessToken;

  React.useEffect(() => {
    axios.get('http://localhost:8080/api/rank')
      .then(response => {
        // axios로 데이터를 가져온 후, 해당 데이터를 rank 상태로 설정
        setRank(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  // turns 값에 따라 랭킹 페이지 컴포넌트 선택
  let RankingPageComponent;

  if (rank && rank.length > 0) {
    if (GameTurns === 10) {
      RankingPageComponent = rank.map((item, index) => (
        <BasicTable key={index} rank={item} />
      ));
    } else if (GameTurns === 15) {
      RankingPageComponent = rank.map((item, index) => (
        <BasicTable key={index} rank={item} />
      ));
    } else if (GameTurns === 20) {
      RankingPageComponent = rank.map((item, index) => (
        <BasicTable key={index} rank={item} />
      ));
    }
  } else {
    // props.rank 배열이 비어있을 때의 처리 (예: 에러 메시지 또는 기본 컴포넌트)
    RankingPageComponent = <div>랭킹 데이터가 없습니다.</div>;
  }

  const nickName = localStorage.getItem("nickname");

  let tmp = localStorage.getItem("tmpAccessToken");
  if (tmp) {
    tmp = JSON.parse(tmp)
  }
  const accessToken = tmp;

  const apiURl = process.env.apiUrl;

  const handleRedis = () => {
    axios.delete(apiURl + '/gameLog', {
      headers: { Authorization: `Bearer ${accessToken}` }
    }).then(response => {
      console.log(response.data);
    })
  }


  axios.get(apiURl + '/gameLog', {
    headers: { Authorization: `Bearer ${accessToken}` }
  })
    .then(response => {
      console.log(response.data);
      setReport(response.data);
    })
    .catch(error => console.log(error));

  const hasRankData = props.rank && Array.isArray(props.rank) && props.rank.length > turnNumber;
  const rankData = hasRankData ? props.rank[turnNumber] : null;

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
              <Typography sx={{ fontWeight: 'bold', fontFamily: "Dovemayo_gothic" }}>{GameTurns} 턴</Typography>
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
