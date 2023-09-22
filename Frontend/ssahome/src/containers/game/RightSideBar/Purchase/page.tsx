"use client"
import React, { useState } from 'react';
import styles from './page.module.css'
import IconButton from "@mui/material/IconButton";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Paper from "@mui/material/Paper";
import { styled as muistyled } from "@mui/material/styles";

const Item = muistyled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  width: "25px", // 원하는 너비 값으로 설정
  height: "25px", // 원하는 높이 값으로 설정
}));

const Purchase = () => {
  const [maxPuerchaseNum, setMaxPurchaseNum] = useState(1);

  // maxPuerchaseNum 값 변경
  const handleMaxUserNumChange = (value: number) => {
    if (value >= 1 && value <= 9) {
      setMaxPurchaseNum(value);
    }
  };

  return (
    <div className={styles.Purchase}>
      <div className={styles.wrap}>
        <div className={styles.RegionDetail}>
          <div className={styles.RegionTitle}>
            지역 상세정보
          </div>
          <div className={styles.RegionName}>
            지역명 : 강남구
          </div>
          <div className={styles.RegionPrice}>
            구매가 : 70,000
          </div>
        </div>
        <div className={styles.ButtonWrap}>
          <Item>{maxPuerchaseNum}</Item>
          <div className={styles.IconButtonWrap}>
            <IconButton
              aria-label="plus"
              onClick={() =>
                handleMaxUserNumChange(maxPuerchaseNum + 1)
              }
              sx={{padding: 0}}
            >
              <ArrowDropUpIcon fontSize="large"/>
            </IconButton>
            <IconButton
              aria-label="minus"
              onClick={() =>
                handleMaxUserNumChange(maxPuerchaseNum - 1)
              }
              sx={{padding: 0}}
            >
              <ArrowDropDownIcon fontSize="large"/>
            </IconButton>
          </div>
          <button type="button" className={styles.button}>
            구매
          </button>
          
        </div>
      </div>
    </div>
    
  );
};

export default Purchase;
