import React from 'react';
import styles from "./page.module.css";
import RankingTable from '@/containers/main/rankingTable';
import  {Button}  from "@mui/material";


const rankingPage = () => {
  return (
    <div className={styles.rankbar}>
        <div className={styles.rankContainerTxt}>
            누가누가 잘하나
        </div>
        <div className={styles.rankContainer}>
            <div className={styles.rankleftContent}>
                <div className={styles.rankCenter}>
                    10턴
                </div>
                <br></br>
                <RankingTable></RankingTable>
            </div>
            <div className={styles.rankmidleContent}>
                <div className={styles.rankCenter}>
                    15턴
                </div>
                <br></br>
                <RankingTable></RankingTable>
            </div>
            <div className={styles.rankrightContent}>
                <div className={styles.rankCenter}>
                    20턴
                </div>
                <br></br>
                <RankingTable></RankingTable>
            </div>
        </div>
    </div>
    
    
    
  );
};

export default rankingPage;