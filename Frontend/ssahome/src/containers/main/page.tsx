'use client';
import React , { useState, useEffect }from 'react';
import  {Button}  from "@mui/material";
import styles from "./page.module.css";
import StartBar from "./startBar";
import Ranking from '@/containers/main/ranking';
import axios from 'axios';


const MainPage = () => {
  const [isOpen, setMenu] = useState(true); // 메뉴의 초기값을 false로 설정
  const [isOpen2, setMenu2] = useState(true); // 메뉴의 초기값을 false로 설정
  const [word, setWord] = useState("");
  const [content, setContent] = useState("");

  const toggleMenu = () => {
    console.log(isOpen);
    setMenu((isOpen) => !isOpen); // on, off 개념 boolean
  };

  const toggleMenu2 = () => {
    console.log(isOpen2);
    setMenu2((isOpen2) => !isOpen2); // on, off 개념 boolean
  };

  useEffect(() =>{
    axios.get('http://localhost:9000/api/word')
    .then(response =>{
      setWord(response.data[1].content);
      setContent(response.data[1].meaning);
      }
    )
    .catch(error => console.log(error))
  },)


  return (
    
    <div className={styles.parents}>
      <div>
        
      </div>
      <div className={styles.GridItemR}>
        <Button onClick={() => toggleMenu2()} 
        className={isOpen ? styles.bnt : styles.bntHide}>랭킹보기</Button>
      </div>
      <div>
        <div>
          <img src="img/sweethome.png" style={{ width: '500px', height: '400px', margin: '0',padding:'0'}}/>
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
      <div className={isOpen2 ? styles['show-menu3'] : styles['hide-menu3']}>
        <Ranking></Ranking>
      </div>


    </div>
  );
};

export default MainPage;


