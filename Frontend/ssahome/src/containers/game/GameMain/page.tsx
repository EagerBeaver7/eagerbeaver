import React from 'react';
import styles from './page.module.css'
import PurchaseList from '@/containers/game/RightSideBar/PurchaseList/page';
import IconButton from "@mui/material/IconButton";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Paper from "@mui/material/Paper";
import { styled as muistyled } from "@mui/material/styles";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Item = muistyled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  width: "25px", // 원하는 너비 값으로 설정
  height: "25px", // 원하는 높이 값으로 설정
}));

// seedMoney prop을 타입으로 정의
type GameMainProps = {
  seedMoney: number;
  setSeedMoney: (value: number) => void;
};

type Region = {
  id: number;
  name: string;
  currentprice: number;
  maxPurchaseNum: number;
};

interface GameData {
  city: string;
  news: string;
  property: { price: number, period: string }[]; 
  region: string;
}

const GameMain: React.FC<GameMainProps> = ({ seedMoney, setSeedMoney }) => {
  const [gameData, setGameData] = useState<GameData[]>([]);
  const [Modalopen, setModalOpen] = React.useState(false);
  const ModalhandleOpen = () => setModalOpen(true);
  const ModalhandleClose = () => setModalOpen(false);
  const [currentPrices, setCurrentPrices] = useState<Record<string, number>>({});


  const [maxPuerchaseNum, setMaxPurchaseNum] = useState(1); // 아파트 구매할 수 있는 개수
  const [purchasedRegions, setPurchasedRegions] = useState<Region[]>([]);

  
  // maxPuerchaseNum 값 변경
  const handleMaxUserNumChange = (value: number) => {
    if (value >= 1 && value <= 9) {
      setMaxPurchaseNum(value);
    }
  };
  
  const [timeSecond, setTimeSecond] = useState(60);
  const [turn, setTurn] = useState(1);
  
  const handleNextTurn = useCallback(() => {
    if (turn < 10) {
      setTurn(turn + 1);
      // 턴이 증가할 때 타이머 초기화
      setTimeSecond(60);
      
    } else {
      alert('게임 종료')
    }
  }, [turn]);

  function formatTime(second: number) {
    const min = Math.floor(second / 60);
    const sec = second % 60;
    return `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
  }

import Timer from './Timer/page';
import Turn from './Turn/page';
import Seed from './Seed/page';
import Map from './Map/page';

    return () => {
      clearInterval(countDown);
    };
  }, [handleNextTurn]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/games/10')
      .then(response => {
        console.log(response.data);
        setGameData(response.data);
      })
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    // 턴에 맞게 각 지역의 현재 가격 정보 가져와서 업데이트
    const newPrices: Record<string, number> = {};
    
    gameData.forEach((regionData) => {
      const currentprice = regionData.property[turn - 1]?.price || 0;
      newPrices[regionData.region] = currentprice;
    });

    setCurrentPrices(newPrices);
  }, [turn, gameData]);


  const [selectedRegion, setSelectedRegion] = useState<string | string>('구매내역');

  const handleRegionClick = (regionName: string) => {
    setSelectedRegion(regionName);
  };

  const handleDecreaseHomePurchase = () => {
    if (seedMoney > 0) {
      // 선택한 지역의 가격을 가져오기
      const selectedRegionData = gameData.find((regionData) => regionData.region === selectedRegion);
  
      if (selectedRegionData) {
        const currentprice = selectedRegionData.property[turn - 1]?.price || 0; // 선택한 턴의 가격을 가져오기
  
        if (currentprice > 0) {
          const newSeedMoney = seedMoney - currentprice;
          setSeedMoney(newSeedMoney);
          console.log('구매 완료');
  
          const newRegion = {
            id: purchasedRegions.length + 1,
            name: selectedRegion,
            currentprice,
            maxPurchaseNum: maxPuerchaseNum, // maxPurchaseNum 추가
          };
  
          setPurchasedRegions((prevRegions) => [...prevRegions, newRegion]);
          ModalhandleOpen();
  
          // maxPuerchaseNum 초기화
          setMaxPurchaseNum(1);
  
          // 이 부분에서 currentprice를 buyPrice로 사용
          axios.post('http://localhost:8080/api/gameLog', {
            id: purchasedRegions.length + 1,
            region: selectedRegion,
            tradeNum: maxPuerchaseNum,
            buyPrice: currentprice, // 여기서 buyPrice로 사용
            sellPrice: -1,
            rate: -1,
            turn: turn,
          })
          .then(response => {
            console.log(response.data);
            console.log('redis로 구매 로그 전송완료')
          })
          .catch(error => console.log(error));
        } else {
          console.log('가격 정보가 없습니다.');
        }
      } else {
        console.log('선택한 지역 정보를 찾을 수 없습니다.');
      }
    }
  };
  
  
  return (
    
    <div>
      <div className={styles.GameMain}>
        <div className={styles.GameHeader}>

          {/* 타이머 */}
          <div className={styles.TimerWrap}>
            <div className={styles.Timer}>
              {formatTime(timeSecond)}
            </div>
          </div>

          {/* 턴 */}
          <div className={styles.TurnWrap}>
            <button type="button" className={styles.button}>
              {`${turn} / 10`}
            </button>

            <div className={styles.button_location}>
              <button className={styles.btn} onClick={handleNextTurn}>
                넘어가기
              </button>
            </div>
          </div>  

          {/* 시드머니 */}
          <div className={styles.Seed}>
            <button type="button" className={styles.button}>
              {seedMoney}원
            </button>
          </div>
        </div>

        <div className={styles.GameMap}>
          <div className={styles.Map}>
            <div className={styles.wrapper}>
            <div className={styles.cards}>
              {gameData.map((regionData, index) => (
                <div
                  key={index}
                  className={`${styles.card} ${
                    purchasedRegions.some((region) => region.name === regionData.region) ? styles.purchased : ''
                  }`}
                  onClick={() => handleRegionClick(regionData.region)}
                >
                  {regionData.region}
                </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.RightSideBar}>
        <div>
          <div className={styles.Purchase}>
            <div className={styles.wrap}>
              <div className={styles.RegionDetail}>
                <div className={styles.RegionTitle}>
                  지역 상세정보
                </div>
                <div className={styles.RegionName}>
                  지역명 : {selectedRegion !== '구매내역' ? selectedRegion : '선택된 지역 없음'}
                </div>
                <div className={styles.RegionPrice}>
                  구매가 : {selectedRegion !== '구매내역' ? 
                    (gameData.find((regionData) => regionData.region === selectedRegion)?.property[(turn-1)]?.price || '0')
                    :
                    '0'
                  }
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
                <button type="button" className={styles.button} onClick={handleDecreaseHomePurchase}>
                  구매
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
        <PurchaseList
          purchasedRegions={purchasedRegions}
          setPurchasedRegions={setPurchasedRegions}
          selectedRegion={selectedRegion} 
          currentPrices={currentPrices}
        />
        </div>
      </div>
    </div>
  );
};

export default GameMain;
