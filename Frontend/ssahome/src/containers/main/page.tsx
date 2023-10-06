'use client';
import React, { useState, useEffect } from 'react';
import { Button } from "@mui/material";
import styles from "./page.module.css";
import StartBar from "./startBar";
import Ranking from '@/containers/main/ranking';
import axios from 'axios';
import home from "/public/images/mainPic.jpg"
import Image from "next/image";

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

const MainPage = () => {
  const [isOpen, setMenu] = useState(true); // 메뉴의 초기값을 false로 설정
  const [isOpen2, setMenu2] = useState(true); // 메뉴의 초기값을 false로 설정
  // 버튼 유무
  const [bntOpen, setBntOpen] = useState(true);
  const [word, setWord] = useState("");
  const [content, setContent] = useState("");
  // 여기서부턴 예지 코드
  // 랭킹보기 누르면 하위 컴포넌트로 가게끔 할 거지롱
  const [rank, setRank] = useState<Props[]>([]); // 배열로 받을 거지롱


  const toggleMenu = () => {
    setBntOpen((bntOpen) => !bntOpen);
    setMenu((isOpen) => !isOpen); // on, off 개념 boolean
  };

  const toggleMenu2 = () => {
    setBntOpen((bntOpen) => !bntOpen);
    setMenu2((isOpen2) => !isOpen2); // on, off 개념 boolean


    if (isOpen2) {
      axios.get('api/rank')
        .then(response => {
          setRank(response.data); // 데이터 업데이트
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  const closeStart = () => {
    setBntOpen((bntOpen) => !bntOpen);
    setMenu((isOpen) => !isOpen);
  }

  const closeRank = () => {
    setBntOpen((bntOpen) => !bntOpen);
    setMenu2((isOpen2) => !isOpen2);
  }

  useEffect(() => {
    axios.get('api/word')
      .then(response => {
        console.log("단어 가져옴" + response);

        setWord(response.data[1].content);
        console.log("ans " + response);
        setContent(response.data[1].meaning);
      }
      )
      .catch(error => {
        console.log("error")
        console.log(error)
      })
  }, [word]);


  return (
    <div className={styles.parents}>
      <div className={styles.GridItemR}>
        <Button onClick={() => toggleMenu()}
          className={bntOpen ? styles['bnt'] : styles['rankBntHide']}>플레이</Button>
      </div>
      <div className={styles.GridItemM}>
        <div className={styles.img}>
          <Image className={styles.homeImg} src={home} alt="slide" ></Image>
        </div>
        <div className={styles.wordTitle}>
          {word}
        </div>
        <br></br>
        <div className={styles.wordContents}>
          {content}
        </div>
      </div>
      <div className={styles.GridItemL}>
        <Button onClick={() => toggleMenu2()} className={bntOpen ? styles['bnt'] : styles['rankBntHide']}>랭킹보기</Button>
      </div>
      <div>

      </div>
      <div className={isOpen ? styles['show-menu3'] : styles['hide-menu3']}>
        <StartBar></StartBar>
        <Button onClick={() => closeStart()} className={styles.playCloseBnt}>X</Button>
      </div>

      <div className={isOpen2 ? styles['show-menu2'] : styles['hide-menu2']}>
        <Ranking rank={rank}></Ranking>
        <Button onClick={() => closeRank()} className={styles.rankCloseBnt}>X</Button>

      </div>
    </div >
  );
};

export default MainPage;
