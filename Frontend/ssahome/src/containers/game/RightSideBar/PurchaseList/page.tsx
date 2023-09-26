import React from 'react';
import styles from './page.module.css'
import IconButton from "@mui/material/IconButton";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Paper from "@mui/material/Paper";
import { styled as muistyled } from "@mui/material/styles";

          </div>
        </div>

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
};

const PurchaseList: React.FC<PurchaseListProps> = ({ purchasedRegions, setPurchasedRegions, selectedRegion, currentPrices }) => {
  const [displayedQuantities, setDisplayedQuantities] = useState<number[]>(
    purchasedRegions.map(region => region.maxPurchaseNum)
  );

  const incrementQuantity = (id: number) => {
     
  };
  
  const decrementQuantity = (id: number) => {
    
  };
  const handleIncreaseHomePurchase = () => {
    
  };


  return (
    <div className={styles.PurchaseList}>
      <div className={styles.wrap}>
        {purchasedRegions.map((region, id) => {
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
                <Item>{region.maxPurchaseNum}</Item>
                <div className={styles.IconButtonWrap}>
                  <IconButton
                    aria-label="plus"
                    onClick={() => incrementQuantity(id)}
                    sx={{padding: 0}}
                  >
                    <ArrowDropUpIcon fontSize="large"/>
                  </IconButton>
                  <IconButton
                    aria-label="minus"
                    onClick={() => decrementQuantity(id)}
                    sx={{padding: 0}}
                  >
                    <ArrowDropDownIcon fontSize="large"/>
                  </IconButton>
                </div>
                <button type="button" className={styles.button} onClick={handleIncreaseHomePurchase}>
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