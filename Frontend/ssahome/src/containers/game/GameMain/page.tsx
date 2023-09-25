'use client'

import React, { useState, useEffect, useCallback } from 'react';
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
import axios from 'axios';

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

const GameMain: React.FC<GameMainProps> = ({ seedMoney, setSeedMoney }) => {
  const [Modalopen, setModalOpen] = React.useState(false);
  const ModalhandleOpen = () => setModalOpen(true);
  const ModalhandleClose = () => setModalOpen(false);

  const [maxPuerchaseNum, setMaxPurchaseNum] = useState(1);

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
      // 게임 종료 또는 다른 로직 처리
    }
  }, [turn]);

  function formatTime(second: number) {
    const min = Math.floor(second / 60);
    const sec = second % 60;
    return `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
  }


  // useEffect(() => {
  //   const countDown = setInterval(() => {
  //     setTimeSecond((prevSecond) => {
  //       if (prevSecond <= 1) {
  //         clearInterval(countDown);
  //         // 타이머가 0이 되면 자동으로 다음 턴으로 넘기기
  //         handleNextTurn();
  //         return 0;
  //       }
  //       return prevSecond - 1;
  //     });
  //   }, 1000);

  //   return () => {
  //     clearInterval(countDown);
  //   };
  // }, [handleNextTurn]);

  useEffect(() =>{
    axios.get('http://localhost:9000/api/games')
    .then(response =>{
      console.log(response.data)
      }
    )
    .catch(error => console.log(error))
  },)
  


  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const handleRegionClick = (regionName: string) => {
    setSelectedRegion(regionName);
  };

  const handleDecreaseHomePurchase = () => { // 시드머니를 활용해서 지역의 집 구매
    if (seedMoney > 0) {
      const newSeedMoney = seedMoney - 10000; // 예를 들어 10000씩 감소
      setSeedMoney(newSeedMoney); // 변경사항을 부모 컴포넌트에 전달
      console.log('구매 완료')
      ModalhandleOpen();
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
                <div className={styles.card} onClick={() => handleRegionClick('속초시')}>속초시</div>
                <div className={styles.card} onClick={() => handleRegionClick('음성군')}>음성군</div>
                <div className={styles.card}>순천시</div>
                <div className={styles.card}>광산구</div>
                <div className={styles.card}>제천시</div>
                <div className={styles.card}>노원구</div>
                <div className={styles.card}>영등포구</div>
                <div className={styles.card}>강남구</div>
                <div className={styles.card}>성남분당구</div>
                <div className={styles.card}>의정부시</div>
                <div className={styles.card}>포항남구</div>
                <div className={styles.card}>해운대구</div>
                <div className={styles.card}>연수구</div>
                <div className={styles.card}>거제시</div>
                <div className={styles.card}>파주시</div>
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
                  지역명 : {selectedRegion || '선택된 지역 없음'}
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
                <button type="button" className={styles.button} onClick={handleDecreaseHomePurchase}>
                  구매
                </button>
                
              </div>
            </div>
          </div>
        </div>
        <div>
          <PurchaseList/>
        </div>
      </div>
      <Modal
          open={Modalopen}
          onClose={ModalhandleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              아파트 구매
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              성공적으로 지역에 아파트 구매가 완료되었습니다.
            </Typography>
          </Box>
        </Modal>
    </div>
  );
};

export default GameMain;
