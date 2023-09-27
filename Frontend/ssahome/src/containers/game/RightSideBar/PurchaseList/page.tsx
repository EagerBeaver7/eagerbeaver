'use client'

import React, { useState, useEffect } from 'react';
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
  currentprice: number;  // 내가 구매했을 당시 구매가격
  maxPurchaseNum: number; 
};

type PurchaseListProps = {
  purchasedRegions: Region[];
  setPurchasedRegions: React.Dispatch<React.SetStateAction<Region[]>>;
  selectedRegion: string;
  currentPrices: {};
  seedMoney: number; // seedMoney 추가
  setSeedMoney: (value: number) => void; // setSeedMoney 추가
};

const PurchaseList: React.FC<PurchaseListProps> = ({ purchasedRegions, setPurchasedRegions, selectedRegion, currentPrices, seedMoney, setSeedMoney }) => {
  const [displayedQuantities, setDisplayedQuantities] = useState<number[]>([]);

  
  // purchasedRegions가 변경될 때마다 displayedQuantities 업데이트
  useEffect(() => {
    setDisplayedQuantities(purchasedRegions.map(region => region.maxPurchaseNum));
  }, [purchasedRegions]);

  const incrementQuantity = (id: number) => {
    // id에 해당하는 지역의 현재 수량을 가져옴
    const currentQuantity = displayedQuantities[id - 1];
    const maxQuantity = purchasedRegions[id-1].maxPurchaseNum; // 최대 수량은 해당 지역의 maxPurchaseNum
  
    // 현재 수량이 최대 수량보다 작을 때만 증가
    if (currentQuantity < maxQuantity) {
      // 증가한 수량을 설정하고 displayedQuantities를 업데이트
      setDisplayedQuantities(prevQuantities => {
        const newQuantities = [...prevQuantities];
        newQuantities[id - 1] = currentQuantity + 1;
        return newQuantities;
      });
    }
  };
  
  const decrementQuantity = (id: number) => {
    // id에 해당하는 지역의 현재 수량을 가져옴
    const currentQuantity = displayedQuantities[id - 1];
  
    // 현재 수량이 1보다 큰 경우에만 감소
    if (currentQuantity > 1) {
      // 감소한 수량을 설정하고 displayedQuantities를 업데이트
      setDisplayedQuantities(prevQuantities => {
        const newQuantities = [...prevQuantities];
        newQuantities[id - 1] = currentQuantity - 1;
        return newQuantities;
      });
    }
  };
  
  const handleIncreaseHomePurchase = (id: number, currentPrice:number, maxPurchaseNum: number) => {
    // id에 해당하는 지역의 현재 수량 (maxPurchaseNum)

    // Item box 안에 있는 판매하고 싶은 수량
    const currentQuantity = displayedQuantities[id - 1];

    if (currentQuantity > 0) {
      const remainingQuantity = maxPurchaseNum - currentQuantity; // 남은 개수

      // 판매할 아이템이 있을 때만 아래 작업 수행
      const totalPrice = seedMoney + currentPrice * currentQuantity;
  
      // 판매한 아이템 가격을 seedMoney에 추가
      setSeedMoney(totalPrice);
  
      // 판매한 아이템의 수량을 0으로 설정  
      setDisplayedQuantities((prevQuantities) => {
        const newQuantities = [...prevQuantities];
        newQuantities[id - 1] = maxPurchaseNum - currentQuantity;
        return newQuantities;
      });

      // 남은 개수가 0이 되면 purchasedRegions에서 해당 지역 정보를 삭제
      if (remainingQuantity === 0) {
        setPurchasedRegions((prevRegions) => {
          const newRegions = [...prevRegions];
          newRegions.splice(id - 1, 1); // 해당 지역 정보 삭제
          console.log(id)
          return newRegions.map((region, index) => ({ ...region, id: index + 1 }));
        });
          
      } else {
        // 남은 개수가 0이 아니면 purchasedRegions를 업데이트하여 남은 개수를 반영
        setPurchasedRegions((prevRegions) => {
          const newRegions = [...prevRegions];
          newRegions[id - 1] = { ...newRegions[id - 1], maxPurchaseNum: remainingQuantity };
          return newRegions;
        });
      }
    } 

  };
  
  return (
    <div className={styles.PurchaseList}>
      <div className={styles.wrap}>
        {purchasedRegions.map((region, index) => {
          // region.name에 해당하는 현재 가격을 currentPrice 변수에 가져옴
          const currentPrice = (currentPrices as Record<string, number>)[region.name] || 0;  // 턴 마다 지역의 현재 가격을 담고있음

          return (
            <div className={styles.Contents} key={region.id}>
              <div className={styles.RegionDetail}>
                {region.name} 상세정보
                <h4>구매 가격: {region.currentprice}원</h4>
                <div>
                  <h4>현재 가격: {currentPrice}원</h4>
                  <h4>수익률: {calculateProfitRate(region.currentprice, currentPrice)}</h4>
                </div>
                <h4>개수: {region.maxPurchaseNum}</h4>  
              </div>
              <div className={styles.ButtonWrap}>
                <Item>{displayedQuantities[index]}</Item>
                <div className={styles.IconButtonWrap}>
                  <IconButton
                    aria-label="plus"
                    onClick={() => incrementQuantity(region.id)}
                    sx={{padding: 0}}
                  >
                    <ArrowDropUpIcon fontSize="large"/>
                  </IconButton>
                  <IconButton
                    aria-label="minus"
                    onClick={() => decrementQuantity(region.id)}
                    sx={{padding: 0}}
                  >
                    <ArrowDropDownIcon fontSize="large"/>
                  </IconButton>
                </div>
                <button type="button" className={styles.button} onClick={() => handleIncreaseHomePurchase(region.id, currentPrice, region.maxPurchaseNum)}>
                  판매
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};


export default PurchaseList;

// 수익률 계산 함수
function calculateProfitRate(purchasePrice: number, currentPrice: number) {
  if (purchasePrice === 0) {
    return '0.00%'; // 구매 가격이 0일 경우 수익률은 0.00%
  }
  
  const profitRate = ((currentPrice - purchasePrice) / purchasePrice) * 100;
  return profitRate.toFixed(2) + '%'; // 소수점 2자리까지 반올림하여 문자열로 반환
}