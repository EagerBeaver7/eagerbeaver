'use client'

import React, { useState, ChangeEvent } from 'react';
import styles from './page.module.css';
import { Button } from '@mui/material';
import axios from "axios";
import Link from 'next/link';

const NickNamePage: React.FC = () => {
  const [inputCount, setInputCount] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>('');

  const onInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 10) {
      setInputValue(value);
      setInputCount(value.length);
    }
  };

  return (
    <main className={styles.nickname}>
      <div className={styles.centering}>
        <div className={styles.title}>
          닉네임을 설정하세요.
        </div>
        <div className={styles.content}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              value={inputValue}
              onChange={onInputHandler}
            />
          </div>
          <div className={styles.counting}>
            <span>{inputCount}</span>
            <span>/10</span>
          </div>
        </div>
        {inputValue.length > 0 && (
          <div className={styles.message}>
            * 중복된 닉네임입니다.
          </div>
        )}
      </div>
      <Link href="/profileimg" className={styles.btnLink}>
        <Button className={styles.start}>다음</Button>
      </Link>
    </main>
  );
};

export default NickNamePage;
