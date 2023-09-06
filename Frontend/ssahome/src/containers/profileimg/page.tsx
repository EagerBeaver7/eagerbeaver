'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

import * as React from 'react';
import styles from './page.module.css';
import {  Typography, Button } from '@mui/material';
import BeaverAvata from './avata';

const ProfileImgPage = () => {
  return (
    <main className={styles.main}>
      <Typography className={styles.pro_title}>당신과 어울리는 비버를 선택해주세요!</Typography>  
      <BeaverAvata/>
      <Button className={styles.start}>시작하기</Button>
    </main>
        
  );
};

export default ProfileImgPage;

