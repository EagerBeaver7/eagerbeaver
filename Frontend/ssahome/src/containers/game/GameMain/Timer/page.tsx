'use client'

import React, { useState, useEffect } from 'react';
import styles from './page.module.css';

const Timer = () => {
  const [timeSecond, setTimeSecond] = useState(60);

  useEffect(() => {
    const countDown = setInterval(() => {
      setTimeSecond((prevSecond) => {
        if (prevSecond <= 1) {
          clearInterval(countDown);
          return 0;
        }
        return prevSecond - 1;
      });
    }, 1000);

    return () => {
      clearInterval(countDown);
    };
  }, []);

  useEffect(() => {
    if (timeSecond === 0) {
      // Handle the timer reaching 0 here
      // You can update the UI or perform any necessary actions
    }
  }, [timeSecond]);

  function formatTime(second) {
    const min = Math.floor(second / 60);
    const sec = second % 60;
    return `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
  }

  return (
    <div className={styles.TimerWrap}>
      <div className={styles.Timer}>
        {formatTime(timeSecond)}
      </div>
    </div>
  );
};

export default Timer;
