// Section1.tsx
import React from "react";
import styles from "./page.module.css";
import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import HomeImge from "../../../public/images/HomeImg1.png"

const Section1: React.FC = () => (
	<div className={`${styles.bg} ${styles.section1} `} >
		<div className={`${styles.beaverlogo} `}>
			<Image
				src={HomeImge}
				alt="HomeImge"
				width={500}
				height={500}
			/>
		</div>
		<Link href="/main" className={styles.btnLink}>
			<div className={`${styles.startbtndiv} `}>
				<Button variant="outlined" className={`${styles.startbtn} `} >시작하기</Button>
			</div>
		</Link>

	</div>
);

export default Section1;