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
  nextprice: number;
};

type PurchaseListProps = {
  purchasedRegions: Region[];
  setPurchasedRegions: React.Dispatch<React.SetStateAction<Region[]>>;
  selectedRegion: string;
  currentPrices: {};
  seedMoney: number; // seedMoney 추가
  setSeedMoney: (value: number) => void; // setSeedMoney 추가
  onComprehensiverRealEstateTaxUpdate: (newValue: number) => void; // 부모로 데이터를 전달할 콜백 함수 타입 정의
  onsetcapitalGainsTaxUpdate: (newValue: number) => void; // 부모로 데이터를 전달할 콜백 함수 타입 정의
};

const PurchaseList: React.FC<PurchaseListProps> = ({ purchasedRegions, setPurchasedRegions, selectedRegion, currentPrices, seedMoney, setSeedMoney, onComprehensiverRealEstateTaxUpdate, onsetcapitalGainsTaxUpdate }) => {
  const [displayedQuantities, setDisplayedQuantities] = useState<number[]>([]);
  const [totalMaxPurchaseNum, setTotalMaxPurchaseNum] = useState<number>(0);

  
  // purchasedRegions가 변경될 때마다 displayedQuantities 업데이트
  useEffect(() => {
    setDisplayedQuantities(purchasedRegions.map(region => region.maxPurchaseNum));
    
    let ComprehensiverRealEstateTax = 0 // 종합부동산세
    const total = purchasedRegions.reduce((total, region) => total + region.maxPurchaseNum, 0);
    setTotalMaxPurchaseNum(total);

    if (totalMaxPurchaseNum <= 2) {
      ComprehensiverRealEstateTax = 0;
    } else if (totalMaxPurchaseNum <= 5) {
      const totalprice = purchasedRegions.reduce((total, region) => {
        total += region.currentprice * region.maxPurchaseNum;
        return total;
      }, 0);

      if (totalprice <= 1000) {
        ComprehensiverRealEstateTax = Math.floor(totalprice * 0.01);
      } else if (totalprice > 1000 && totalprice <= 2000) {
        ComprehensiverRealEstateTax = Math.floor(totalprice * 0.015);
      } else if (totalprice > 2000 && totalprice <= 4000) {
        ComprehensiverRealEstateTax = Math.floor(totalprice * 0.02);
      } else if (totalprice > 4000 && totalprice <= 20000) {
        ComprehensiverRealEstateTax = Math.floor(totalprice * 0.03);
      } else if (totalprice > 20000 && totalprice <= 30000){
        ComprehensiverRealEstateTax = Math.floor(totalprice * 0.04);
      } else {
        ComprehensiverRealEstateTax = Math.floor(totalprice * 0.055);
      }

    } else {
      const totalprice = purchasedRegions.reduce((total, region) => {
        total += region.currentprice * region.maxPurchaseNum;
        return total;
      }, 0);

      if (totalprice <= 1000) {
        ComprehensiverRealEstateTax = Math.floor(totalprice * 0.015);
      } else if (totalprice > 1000 && totalprice <= 2000) {
        ComprehensiverRealEstateTax = Math.floor(totalprice * 0.02);
      } else if (totalprice > 2000 && totalprice <= 4000) {
        ComprehensiverRealEstateTax = Math.floor(totalprice * 0.025);
      } else if (totalprice > 4000 && totalprice <= 20000) {
        ComprehensiverRealEstateTax = Math.floor(totalprice * 0.035);
      } else if (totalprice > 20000 && totalprice <= 30000){
        ComprehensiverRealEstateTax = Math.floor(totalprice * 0.05);
      } else {
        ComprehensiverRealEstateTax = Math.floor(totalprice * 0.065);
      }

    }

    console.log('내가 가진 아파트 수:', totalMaxPurchaseNum);
    
    onComprehensiverRealEstateTaxUpdate(ComprehensiverRealEstateTax); // 부모 컴포넌트로 데이터 전달
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
  
  const handleIncreaseHomePurchase = (id: number, currentPrice:number, maxPurchaseNum: number, currentprice: number) => {
    // id에 해당하는 지역의 현재 수량 (maxPurchaseNum)

    // Item box 안에 있는 판매하고 싶은 수량
    const currentQuantity = displayedQuantities[id - 1];

    if (currentQuantity > 0) {
      const remainingQuantity = maxPurchaseNum - currentQuantity; // 남은 개수
      let capitalGainsTax = 0 // 양도소득세
      
      // 양도소득세 계산
      if (currentPrice > currentprice) {
        // 현재 가격이 구매 가격보다 높을 때만 양도소득세 계산
        const gain = (currentPrice - currentprice) * currentQuantity; // 이익 계산
        // totalMaxPurchaseNum을 이용하여 조건 추가
        if (totalMaxPurchaseNum <= 2) {
          if (gain <= 120) {
            capitalGainsTax = Math.floor(gain * 0.06); // 양도소득세 계산 및 저장
          } else if (gain > 120 && gain <= 460){
            capitalGainsTax = Math.floor(gain * 0.15);
          } else if (gain > 460 && gain <= 880){
            capitalGainsTax = Math.floor(gain * 0.24);
          } else if (gain > 880 && gain <= 1500){
            capitalGainsTax = Math.floor(gain * 0.35);
          } else if (gain > 1500 && gain <= 3000){
            capitalGainsTax = Math.floor(gain * 0.38);
          } else if (gain > 3000 && gain <= 5000){
            capitalGainsTax = Math.floor(gain * 0.40);
          } else {
            capitalGainsTax = Math.floor(gain * 0.42);
          }
        } else if (totalMaxPurchaseNum > 2 && totalMaxPurchaseNum <= 5) {
          if (gain <= 120) {
            capitalGainsTax = Math.floor(gain * 0.06); // 양도소득세 계산 및 저장
          } else if (gain > 120 && gain <= 460){
            capitalGainsTax = Math.floor(gain * 0.25);
          } else if (gain > 460 && gain <= 880){
            capitalGainsTax = Math.floor(gain * 0.34);
          } else if (gain > 880 && gain <= 1500){
            capitalGainsTax = Math.floor(gain * 0.45);
          } else if (gain > 1500 && gain <= 3000){
            capitalGainsTax = Math.floor(gain * 0.48);
          } else if (gain > 3000 && gain <= 5000){
            capitalGainsTax = Math.floor(gain * 0.50);
          } else {
            capitalGainsTax = Math.floor(gain * 0.52);
          }
        } else {
          if (gain <= 120) {
            capitalGainsTax = Math.floor(gain * 0.06); // 양도소득세 계산 및 저장
          } else if (gain > 120 && gain <= 460){
            capitalGainsTax = Math.floor(gain * 0.35);
          } else if (gain > 460 && gain <= 880){
            capitalGainsTax = Math.floor(gain * 0.44);
          } else if (gain > 880 && gain <= 1500){
            capitalGainsTax = Math.floor(gain * 0.55);
          } else if (gain > 1500 && gain <= 3000){
            capitalGainsTax = Math.floor(gain * 0.58);
          } else if (gain > 3000 && gain <= 5000){
            capitalGainsTax = Math.floor(gain * 0.60);
          } else {
            capitalGainsTax = Math.floor(gain * 0.62);
          }
        }
      }

      // 판매할 아이템이 있을 때만 아래 작업 수행
      const totalPrice = seedMoney + (currentPrice * currentQuantity) - capitalGainsTax;

      // 판매한 아이템 가격을 seedMoney에 추가
      setSeedMoney(totalPrice);
      onsetcapitalGainsTaxUpdate(capitalGainsTax)
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
                <button type="button" className={styles.button} onClick={() => handleIncreaseHomePurchase(region.id, currentPrice, region.maxPurchaseNum, region.currentprice)}>
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