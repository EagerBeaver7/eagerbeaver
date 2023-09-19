// Section5.tsx
import React from "react";
import styles from "./page.module.css";
import  {Button}  from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import Beaver from "../../../public/img/Beaver.png"

const Section5: React.FC = () => (
  <div className={`${styles.bg} ${styles.section5} `} >
    <div className={`${styles.cheer} `}>
      지금 바로 당신의 능력을 보여주세요
	  </div>
    <div className={`${styles.grap} `}>
      <div className={`${styles.beaverlogo} `}>
        <Image
          src={Beaver}
          alt="Beaver"
          width={400}
          height={400}
        />
      </div>
    </div>
    <Link href="/main" className={styles.btnLink}>
      <div className={`${styles.startbtndiv} `}>
        <Button variant="outlined"  className={`${styles.startbtn} `} >시작하기</Button>
      </div>
    </Link>
  </div>
);

export default Section5;