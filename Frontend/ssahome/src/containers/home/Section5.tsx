// Section5.tsx
import React from "react";
import styles from "./page.module.css";
import { Button } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import city from "/public/images/city7.jpg"

const Section5: React.FC = () => (
  <div className={`${styles.bg} ${styles.section5} `} >

    <div className={styles.textContainer4}>
      <div className={styles.cheer}>
        지금 바로 당신의 능력을 보여주세요!
      </div>

      <Link href="/main" className={styles.btnLink}>
        <div className={styles.startbtndiv}>
          <Button variant="outlined" className={styles.startbtn}>시작하기</Button>
        </div>
      </Link>
    </div>

    <div className={styles.cityBox}>
      <Image
        src={city}
        alt="city"
        className={styles.city2}
      />
    </div>

  </div>
);

export default Section5;