'use client'

import { FullPageScroll } from "./FullPageScroll";
import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";
import Section5 from "./Section5";

function HomePage() {
	return (
		<div>
			<FullPageScroll>
				<Section1 />
				<Section2 />
				<Section3 />
				<Section5 />
			</FullPageScroll>
		</div>
	);
}

export default HomePage;