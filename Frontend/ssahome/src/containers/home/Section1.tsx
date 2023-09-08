// Section1.tsx
import React from "react";
import styles from "./page.module.css";
import  {Button}  from "@mui/material";

const Section1: React.FC = () => (
  <div className={`${styles.bg} ${styles.section} ${styles.section1}`} >
	<div className={`${styles.beaverlogo} `}>
		<div>민석아</div>

	</div>
	
  </div>
);

export default Section1;