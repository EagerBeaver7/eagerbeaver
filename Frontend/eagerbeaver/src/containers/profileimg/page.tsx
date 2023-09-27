'use client';

import * as React from 'react';
import styles from './page.module.css';
import { Typography } from '@mui/material';
import BeaverAvata from './avata';

const ProfileImgPage = () => {
  return (
    <main >
      <Typography className={styles.pro_title}>당신과 어울리는 비버를 선택해주세요!</Typography>
      <Typography className={styles.pro_subtitle}>*선택시 해당비버로 설정되며 메인화면으로 넘어갑니다*</Typography>
      <BeaverAvata />
    </main>

  );
};

export default ProfileImgPage;

