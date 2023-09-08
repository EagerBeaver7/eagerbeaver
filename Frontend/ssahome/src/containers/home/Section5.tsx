// Section5.tsx
import React from "react";
import styles from "./page.module.css";
import  {Button}  from "@mui/material";

const Section5: React.FC = () => (
  <div className={`${styles.bg} ${styles.section5} `} >
    <div className={`${styles.cheer} `}>
      지금 바로 당신의 능력을 보여주세요
	  </div>
    <div className={`${styles.grap} `}>
      <img src="img/fnvl.png" style={{ width: '100%', height: '100%', margin: '0',padding:'0'}}/>
    </div>
    <div className={`${styles.startbtndiv} `}>
      <Button variant="outlined"  className={`${styles.startbtn} `} >시작하기</Button>
    </div>
	
	
  </div>
);

export default Section5;