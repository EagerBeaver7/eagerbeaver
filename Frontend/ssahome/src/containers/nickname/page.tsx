'use client'

import React, { useState, ChangeEvent } from 'react';
import styles from './page.module.css';

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
          <input value={inputValue} onChange={onInputHandler} />
          <p>
            <span>{inputCount}</span>
            <span>/10 자</span>
          </p>
        </div>
        <div className={styles.message}>
          확인메세지
        </div>
      </div>
    </main>
  );
};

export default NickNamePage;
