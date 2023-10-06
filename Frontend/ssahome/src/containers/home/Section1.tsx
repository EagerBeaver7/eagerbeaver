// Section1.tsx
import styles from "./page.module.css";
import { Button } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import city from '/public/images/back1.jpg'



const Section1: React.FC = () => (
	<div className={`${styles.bg} ${styles.section1} `} >

		<div className={styles.flowContainer}>
			<div className={styles.flowText}>
				<div className={styles.flowWrap}>Eager Beaver를 플레이하고 내 집 마련을 준비하세요.</div>
				<div className={styles.flowWrap}>Eager Beaver를 플레이하고 집 값 폭락을 대비하세요.</div>
				<div className={styles.flowWrap}>Eager Beaver를 플레이하고 내 집 마련을 준비하세요.</div>
				<div className={styles.flowWrap}>Eager Beaver를 플레이하고 집 값 폭락을 대비하세요.</div>
				<div className={styles.flowWrap}>Eager Beaver를 플레이하고 집 값 폭락을 대비하세요.</div>
			</div>
		</div>

		<div className={styles.textContainer}>
			<div className={styles.mainText}>
				Eager Beaver
			</div>

			<div className={styles.subText}>
				뉴스를 읽고 집값을 예측해서 수익을 만들어보세요!
			</div>

			<div className={styles.subText2}>
				실제 데이터를 기반으로한 부동산 시뮬레이션 게임입니다.
			</div>

			<Link href="/main" className={styles.btnLink}>
				<div className={`${styles.startbtndiv} `}>
					<Button variant="outlined" className={`${styles.startbtn} `} >시작하기</Button>
				</div>
			</Link>
		</div>

		<Image src={city} alt="city" className={styles.city} />

	</div>
);

export default Section1;