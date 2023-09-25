"use client"

import React, { useEffect, useState } from 'react';
import styles from './page.module.css';

function Turn() {
  const [turn, setTurn] = useState(1); 

  useEffect(() => {
    const handleLocalStorageChange = (event: StorageEvent) => {
      if (event.key === 'turn' && event.newValue !== null) {
        const newTurn = parseInt(event.newValue, 10);
        if (!isNaN(newTurn)) {
          setTurn(newTurn);
        }
      }
    };

    window.addEventListener('storage', handleLocalStorageChange);

    const savedTurn = localStorage.getItem('turn');
    if (savedTurn !== null) {
      const parsedTurn = parseInt(savedTurn, 10);
      if (!isNaN(parsedTurn)) {
        setTurn(parsedTurn);
      }
    }

    return () => {
      window.removeEventListener('storage', handleLocalStorageChange);
    };
  }, []);

  return (
    <div className={styles.TurnWrap}>
      <button type="button" className={styles.button}>
        {`${turn} / 10`}
      </button>
    </div>
  );
}

export default Turn;
