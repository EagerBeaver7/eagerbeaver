'use client';
import React, { useState, useEffect } from 'react';
import { Button } from "@mui/material";
import styles from "./page.module.css";
import StartBar from "./startBar";
import Ranking from '@/containers/main/ranking';
import axios from 'axios';
import home from "../../../public/img/sweethome.png"
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
  const [word, setWord] = useState("");
  const [content, setContent] = useState("");
  // 여기서부턴 예지 코드
  // 랭킹보기 누르면 하위 컴포넌트로 가게끔 할 거지롱
  const [rank, setRank] = useState<Props[]>([]); // 배열로 받을 거지롱


  const toggleMenu = () => {
    // console.log(isOpen);
    setMenu((isOpen) => !isOpen); // on, off 개념 boolean
  };

  const toggleMenu2 = () => {
    // console.log(isOpen2);
    setMenu2((isOpen2) => !isOpen2); // on, off 개념 boolean
    axios.get('api/rank')
      .then(response => {
        setRank(response.data); // 데이터 업데이트
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    axios.get('http://localhost:8080/api/word')
      .then(response => {
        setWord(response.data[1].content);
        // console.log("ans "+response);
        setContent(response.data[1].meaning);
      }
      )
      .catch(error => {
        console.log("error")
        console.log(error)
      })
  }, [word]);


  return (
    <>
      <div className={styles.parents}>
        <div className={styles.GridItemR}>
          <Button onClick={() => toggleMenu2()}
            className={isOpen ? styles.bnt : styles.bntHide}>랭킹보기</Button>
        </div>
        <div>
          <div>
            <Image src={home} alt="slide" width={500} height={400}></Image>
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
          <Button onClick={() => toggleMenu()} className={isOpen2 ? styles.bnt : styles.bntHide}>플레이</Button>
        </div>
        <div>

        </div>

        <div className={isOpen ? styles['show-menu3'] : styles['hide-menu3']}>
          <StartBar></StartBar>
        </div>
        <div className={isOpen2 ? styles['show-menu2'] : styles['hide-menu2']}>
          <Ranking rank={rank}></Ranking>
        </div>


      </div>
    </>
  );
};

export default MainPage;