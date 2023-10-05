'use client';
import React from "react";
import Link from "next/link";
import { ROUTES } from './constants';
import Session from "./Session";
import styles from './page.module.css';
import Image from 'next/image';
import Logo from '../../../../public/images/Logo.png'

const Header = () => {


  return (
    <header className={styles.appHeader}>
      <div className={styles.menu}>
        <Link href={ROUTES[0].href} className={styles.Logo}>
          <Image
            src={Logo}
            alt="Logo"
            width={150}
            height={50}
          />
        </Link>
        <Session />
      </div>
    </header>
  );
};

export default Header;
