import React from "react";
import Link from "next/link";

import { ROUTES } from './constants';

import Session from "./Session";
import styles from './page.module.css';

const Header = () => {
  return (
    <header className={styles.appHeader}>
      <div className={styles.menu}>
        <Link href={ROUTES[0].href} className={styles.linkWithoutUnderline}>
          HOME
        </Link>
        <Link href={ROUTES[1].href} className={styles.linkWithoutUnderline}>
          NICKNAME
        </Link>
        <Link href={ROUTES[2].href} className={styles.linkWithoutUnderline}>
          PROFILEIMG
        </Link>
        <Link href={ROUTES[3].href} className={styles.linkWithoutUnderline}>
          MAIN
        </Link>
        <Link href={ROUTES[4].href} className={styles.linkWithoutUnderline}> 
          GAME
        </Link>
        <Link href={ROUTES[5].href} className={styles.linkWithoutUnderline}>
          RESULT
        </Link>
        <Session />
      </div>
    </header>
  );
};

export default Header;