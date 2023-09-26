'use client'

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

type Region = {
  id: number;
  name: string;
  price: number;
  maxPurchaseNum: number; 
};

type PurchaseListProps = {
  purchasedRegions: Region[];
  setPurchasedRegions: React.Dispatch<React.SetStateAction<Region[]>>;
};

const PurchaseList: React.FC<PurchaseListProps> = ({ purchasedRegions, setPurchasedRegions }) => {
  // maxPuerchaseNum 값 변경
  const handleMaxUserNumChange = (regionId: number, newMaxPurchaseNum: number) => {
    if (newMaxPurchaseNum >= 1 && newMaxPurchaseNum <= 9) {
      setPurchasedRegions((prevRegions) =>
        prevRegions.map((region) =>
          region.id === regionId
            ? { ...region, maxPurchaseNum: newMaxPurchaseNum } // 변수 이름 변경
            : region
        )
      );
    }
  };

  return (
    <div className={styles.PurchaseList}>
      <div className={styles.wrap}>
        {purchasedRegions.map((region) => (
          <div className={styles.Contents} key={region.id}>
            <div className={styles.RegionDetail}>
              {region.name} 상세정보
              <p>가격: {region.price}원</p>
              <p>개수: {region.maxPurchaseNum}</p>
            </div>
            <div className={styles.ButtonWrap}>
              <Item>{region.maxPurchaseNum}</Item>
              <div className={styles.IconButtonWrap}>
                <IconButton
                  aria-label="plus"
                  onClick={() =>
                    handleMaxUserNumChange(region.id, region.maxPurchaseNum + 1)
                  }
                  sx={{ padding: 0 }}
                >
                  <ArrowDropUpIcon fontSize="large" />
                </IconButton>
                <IconButton
                  aria-label="minus"
                  onClick={() =>
                    handleMaxUserNumChange(region.id, region.maxPurchaseNum - 1)
                  }
                  sx={{ padding: 0 }}
                >
                  <ArrowDropDownIcon fontSize="large" />
                </IconButton>
              </div>
              <button type="button" className={styles.button}>
                판매
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PurchaseList;