'use client';

import * as React from 'react';
import { Avatar, Typography } from '@mui/material';
import styles from './page.module.css';
import Stack from '@mui/material/Stack';

const BeaverAvata = () => {
    return (
        <Stack className={styles.pic}>
          <Avatar className={styles.pic_ava}  alt="Remy Sharp" src="" />
          <Typography>오늘도 열정적으로 집을 짓는 저스틴</Typography>
        </Stack>
        
      
    );
  };
  
  export default BeaverAvata;