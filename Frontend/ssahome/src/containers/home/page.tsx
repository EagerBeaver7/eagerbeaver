'use client'

import { Suspense } from 'react';
import styles from "./page.module.css";
import { FullPageScroll } from "./FullPageScroll";
import Section1 from "./Section1"; 
import Section2 from "./Section2";
import Section3 from "./Section3";
import Section4 from "./Section4";
import Section5 from "./Section5";



const DIVIDER_HEIGHT = 5;


function HomePage ()  {
 

  return (
		<div>
			<FullPageScroll>
        <Section1 />
				<Section2 />
        <Section3 />
        <Section4 />
        <Section5 />
			</FullPageScroll>
		</div>
	);
}

export default HomePage;