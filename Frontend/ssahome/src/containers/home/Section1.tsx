// Section1.tsx
import React from "react";
import styles from "./page.module.css";
import  {Button}  from "@mui/material";

const Section1: React.FC = () => (
  <div className={`${styles.bg} ${styles.section1} `} >
	<div className={`${styles.beaverlogo} `}>
		<img src="img/beavor_main.png" style={{ width: '500px', height: '500px' }}/>
	</div>
	<div className={`${styles.startbtndiv} `}>
		<Button variant="outlined"  className={`${styles.startbtn} `} >시작하기</Button>
	</div>
	
	
  </div>
);

export default Section1;