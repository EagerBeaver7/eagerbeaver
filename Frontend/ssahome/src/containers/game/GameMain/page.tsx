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
import axios from 'axios'
import { styled } from '@mui/material/styles';
import SpeedDial, { SpeedDialProps } from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from "next/navigation";
import { createTheme, ThemeProvider } from '@mui/material';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function createData(
  range: string,
  percent: number,
) {
  return { range, percent };
}
const rows = [
  createData('3,000 시드 이하', 0.1),
  createData('3,000 시드 ~ 8,000시드', 0.15),
  createData('8,000 시드 ~ 15,000시드', 0.25),
  createData('15,000 시드 ~ 30,000시드', 0.4),
  createData('30,000 시드 초과', 0.4),
];
const rows1 = [
  createData('10,000 시드 이하', 0.01),
  createData('10,000 시드 ~ 20,000시드', 0.015),
  createData('20,000 시드 ~ 40,000시드', 0.02),
  createData('40,000 시드 ~ 200,000시드', 0.03),
  createData('200,000 시드 ~ 300,000시드', 0.04),
  createData('300,000 시드 초과', 0.055),
];
const rows2 = [
  createData('1,200 시드 이하', 0.06),
  createData('1,200 시드 ~ 4,600시드', 0.15),
  createData('4,600 시드 ~ 8,800시드', 0.24),
  createData('8,800 시드 ~ 15,000시드', 0.35),
  createData('15,000 시드 ~ 30,000시드', 0.38),
  createData('30,000 시드 ~ 50,000시드', 0.40),
  createData('50,000 시드 초과', 0.42),
];

const theme = createTheme({
  typography: {
    fontFamily: 'Dovemayo_gothic', // 여기에 사용할 글꼴을 지정합니다.
    fontSize: 30,
  },
});

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const style2 = {
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
const style3 = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 550,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  // backgroundImage: `url('/public/images/win.jpg')`, 
  // backgroundSize: 'cover', 
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
  setSeedMoney: (value: number) => any;
};

type Region = {
  id: number;
  name: string;
  currentprice: number;
  maxPurchaseNum: number;
  nextprice: number;
};

interface GameData {
  city: string;
  news: { title: string, summary: string, publishedDt: string }[];
  property: { price: number, period: string }[];
  region: string;
}

interface SearchFunctions {
  searchTerm: string;
  saveSearchTerm: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isEnter: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  search: () => void;
  searchResults: any[]; // 또는 실제 타입에 맞게 변경
}

// PriceComponent 추가
interface PriceComponentProps {
  onBuyClick: () => void; // onBuyClick prop의 타입을 명시적으로 지정
}

const PriceComponent: React.FC<PriceComponentProps> = ({ onBuyClick }) => (
  <div className={styles.PriceWrap}>
    <div className={styles.PriceTitle}>다음 시세 구매</div>
    <div className={styles.PriceContent}>집을 보유하고 있는 지역의 다음 턴 시세 정보를 미리 확인할 수 있습니다.</div>
    <div className={styles.PriceWon}> 500 시드 </div>
    <div className={styles.ButtonWrap}>
      {/* onClick 이벤트 핸들러에 onBuyClick 함수를 연결 */}
      <button className={styles.Button} onClick={onBuyClick}>구매</button>
    </div>
  </div>
);

// NewsComponent 추가
interface NewsComponentProps {
  onBuyClick: () => void; // onBuyClick prop의 타입을 명시적으로 지정
}

const NewsComponent: React.FC<NewsComponentProps> = ({ onBuyClick }) => (
  <div className={styles.NewsWrap}>
    <div className={styles.NewsContent}>
      <div className={styles.NewsTitle1}>뉴스 추가 구매</div>
      <div className={styles.NewsTitle2}>다른 기본뉴스를 추가로 하나 더 확인할 수 있습니다</div>
      <div className={styles.NewsWon}> 100 시드 </div>
      <div className={styles.NewsButtonWrap}><button className={styles.NewsButton} onClick={onBuyClick}>구매</button></div>
    </div>
  </div>
);

// SearchComponent 추가
const SearchComponent = () => {
  // 검색 기능
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<string>([]);

  const isEnter = (event: { key: string; }) => {
    if (event.key === 'Enter') {
      // Enter 키가 눌렸을 때 검색 실행
      search();
    }
  };

  const saveSearchTerm = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSearchTerm(event.target.value);
  };

  const search = async () => {
    console.log('버튼클릭')
    if (searchTerm.trim() === '') {
      // 검색어가 비어있으면 아무 작업도 하지 않음
      return;
    }

    //요청 헤더
    const headers = {
      'Content-Type': 'application/json',
      'X-Naver-Client-Id': 'uhllo7K7HbHqGPgW7Lvh',
      'X-Naver-Client-Secret': 'LcizFJirt3',
    };

    //성인 검색어 판별 API URI 
    const adultURI = `/v1/search/adult.json?query=${encodeURIComponent(searchTerm)}`
    //오타변환 API URI
    const errataURI = `/v1/search/errata.json?query=${encodeURIComponent(searchTerm)}`

    //1. 성인 검색어 판별
    axios.get(adultURI, { headers })
      .then((response1) => {
        console.log('Adult API Response:', response1.data);
        if (response1.data.adult === 1) { //성인 검색어인 경우
          return;
        }
        //2. 오타변환
        return axios.get(errataURI, { headers });
      })
      .then((response2) => {
        console.log('Errata API Response:', response2);
        if (typeof response2 !== 'undefined') {
          //오타인 경우 수정된 단어를 사용하고 아닌 경우 사용자 검색어 그대로 사용
          const encycURI = `/v1/search/encyc.json?query=${encodeURIComponent(
            response2.data.errata === '' ? searchTerm : response2.data.errata)}`
          //3. 백과사전 검색
          axios.get(encycURI, { headers }).then((finalResponse) => {
            console.log('final API Response:', finalResponse);
            if (finalResponse.data.items.length === 0) {
              setSearchResults(searchTerm + '은(는) 검색 결과가 없습니다!');
              return;
            };

            const originalString = finalResponse.data.items[0].description; //검색 결과
            //검색 결과에서 설명 부분만 추출

            const erase1 = '<b>';
            const erase2 = '</b>';

            setSearchResults(originalString.replaceAll(erase1, "").replaceAll(erase2, ""));

          })

        }
      })
      .catch((error) => {
        console.error('에러:', error);
      });
  }
  return (
    <div className={styles.SearchWrap}>
      <div className={styles.SearchButton}>
        <input type="text" className={styles.search_input} placeholder="용어 검색"
          value={searchTerm}
          onChange={saveSearchTerm}
          onKeyDown={isEnter} />
        <button className={styles.search_button} onClick={search}>
          <svg className={styles.search_icon} aria-hidden="true" viewBox="0 0 24 24">
            <g>
              <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
            </g>
          </svg>
        </button>
      </div>
      <div className={styles.SearchContent}>
        {searchResults}
      </div>
    </div>
  );
};

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  position: 'relative',
  '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
    top: theme.spacing(2),
    left: theme.spacing(2),
  },
}));

const actions = [
  { icon: <PriceCheckIcon />, name: '다음 시세' },
  { icon: <NewspaperIcon />, name: '뉴스 추가' },
  { icon: <SearchIcon />, name: '용어 검색' },
];



const GameMain: React.FC<GameMainProps> = ({ seedMoney, setSeedMoney }) => {
  const router = useRouter();
  let GameTurns: number = 10; // 기본값으로 0을 설정하거나, 다른 적절한 초기값으로 설정

  const storedGameTurns = localStorage.getItem('Turns');
  if (storedGameTurns !== null) {
    GameTurns = parseInt(storedGameTurns, 10);
  }
  let GameTime: number = 60; // 기본값으로 0을 설정하거나, 다른 적절한 초기값으로 설정

  const storedGameTime = localStorage.getItem('Time');
  if (storedGameTime !== null) {
    GameTime = parseInt(storedGameTime, 10);
  }
  let tmp = localStorage.getItem("tmpAccessToken");
  if (tmp) {
    tmp = JSON.parse(tmp)
  }
  const accessToken = tmp;
  const [gameData, setGameData] = useState<GameData[]>([]);
  const [Modalopen, setModalOpen] = React.useState(false);
  const ModalhandleOpen = () => setModalOpen(true);
  const ModalhandleClose = () => setModalOpen(false);
  const [TaxModalopen, setTaxModalOpen] = React.useState(false);
  const TaxModalhandleOpen = () => setTaxModalOpen(true);
  const TaxModalhandleClose = () => setTaxModalOpen(false);
  const [NewsModalopen, setNewsModalOpen] = React.useState(false);
  const NewsModalhandleOpen = () => setNewsModalOpen(true);
  const NewsModalhandleClose = () => setNewsModalOpen(false);
  const [AddNewsModalopen, setAddNewsModalOpen] = React.useState(false);
  const AddNewsModalhandleOpen = () => setAddNewsModalOpen(true);
  const AddNewsModalhandleClose = () => setAddNewsModalOpen(false);
  const [NextPriceModalopen, setNextPriceModalOpen] = React.useState(false);
  const NextPriceModalhandleOpen = () => setNextPriceModalOpen(true);
  const NextPriceModalhandleClose = () => setNextPriceModalOpen(false);
  const [MyTaxModalopen, setMyTaxModalOpen] = React.useState(false);
  const MyTaxModalhandleOpen = () => setMyTaxModalOpen(true);
  const MyTaxModalhandleClose = () => setMyTaxModalOpen(false);
  const [SalaryModalopen, setSalaryModalOpen] = React.useState(false);
  const SalaryModalhandleOpen = () => setSalaryModalOpen(true);
  const SalaryModalhandleClose = () => setSalaryModalOpen(false);
  const [GamesetModalopen, setGamesetModalOpen] = React.useState(false);
  const [finalSeedMoney, setFinalSeedMoney] = React.useState(0); // State to hold final seed money value
  const GamesetModalhandleOpen = (tmpSeedMoney: number) => {
    setFinalSeedMoney(tmpSeedMoney); // Set the final seed money value when opening the modal
    setGamesetModalOpen(true);
  };
  const GamesetModalhandleClose = () => setGamesetModalOpen(false);
  const [currentPrices, setCurrentPrices] = useState<Record<string, number>>({});
  const [newsData, setNewsData] = useState<Record<string, { title: string; summary: string; publishedDt: string }[]>>({});

  const [totalAcquisitionTax, setTotalAcquisitionTax] = useState(0);
  const [totalComprehensiverRealEstateTax, setTotalComprehensiverRealEstateTax] = useState(0);
  const [totalCapitalGainsTax, setTotalCapitalGainsTax] = useState(0);

  const [maxPuerchaseNum, setMaxPurchaseNum] = useState(1); // 아파트 구매할 수 있는 개수
  const [purchasedRegions, setPurchasedRegions] = useState<Region[]>([]);
  const [acquisitionTax, setAcquisitionTax] = useState(0)

  // PurchaseList에서 콜백 받아올 변수
  const [comprehensiverRealEstateTax, setComprehensiverRealEstateTax] = useState<number>(0);
  const [capitalGainsTax, setcapitalGainsTax] = useState<number>(0);
  // 자식 컴포넌트에서 호출할 콜백 함수
  const handleComprehensiverRealEstateTaxUpdate = (newValue: number) => {
    setComprehensiverRealEstateTax(newValue);
  };
  const handlecapitalGainsTaxUpdate = (newValue: number) => {
    setcapitalGainsTax(newValue);
    console.log("양도 소득세 " + capitalGainsTax);
    setTotalCapitalGainsTax(totalCapitalGainsTax + capitalGainsTax);
  };

  const [direction, setDirection] =
    React.useState<SpeedDialProps['direction']>('right');

  const [open, setOpen] = React.useState(false);
  const [displayComponent, setDisplayComponent] = useState<React.ReactNode>(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  // 아이템 컴포넌트 Click Event
  const handlePriceClick = () => {
    // '다음 시세' 버튼이 클릭되었을 때 실행할 동작
    setDisplayComponent(<PriceComponent onBuyClick={handleDecreaseNextMoney} />);
    handleClose();
  };

  const handleNewsClick = () => {
    // '뉴스 추가' 버튼이 클릭되었을 때 실행할 동작
    setDisplayComponent(<NewsComponent onBuyClick={handleDecreaseAddNews} />);
    handleClose();
  };

  const handleSearchClick = () => {
    // '용어 검색' 버튼이 클릭되었을 때 실행할 동작
    setDisplayComponent(<SearchComponent />);
    handleClose();
  };

  const handleDecreaseNextMoney = () => { // 시드머니를 활용해서 아이템 다음시세 구매
    if (seedMoney > 0) {
      const newSeedMoney = seedMoney - 500; // 예를 들어 1000씩 감소
      setSeedMoney(newSeedMoney); // 변경사항을 부모 컴포넌트에 전달
      console.log('구매 완료')
      NextPriceModalhandleOpen();
    }
  };
  const handleDecreaseAddNews = () => { // 시드머니를 활용해서 아이템 뉴스 추가 구매
    if (seedMoney > 0) {
      const newSeedMoney = seedMoney - 100; // 예를 들어 1000씩 감소
      setSeedMoney(newSeedMoney); // 변경사항을 부모 컴포넌트에 전달
      console.log('구매 완료')
      AddNewsModalhandleOpen();
    }
  };

  // maxPuerchaseNum 값 변경
  const handleMaxUserNumChange = (value: number) => {
    if (value >= 1 && value <= 9) {
      setMaxPurchaseNum(value);
    }
  };


  // 타이머 기능
  const [timeSecond, setTimeSecond] = useState(GameTime)
  const [turn, setTurn] = useState(1);

  const handleNextTurn = useCallback(() => {
    if (turn < GameTurns) {
      setTurn(turn + 1);
      // 턴이 증가할 때 타이머 초기화
      setTimeSecond(GameTime);
      setSeedMoney((prevSeedMoney: number) => prevSeedMoney + 500);
      SalaryModalhandleOpen()

      // purchasedRegions 배열의 각 항목의 nextprice 업데이트
      const updatedPurchasedRegions = purchasedRegions.map((regionItem) => {
        // gameData에서 해당 지역의 새로운 턴의 정보를 가져와서 nextprice 업데이트
        const regionData = gameData.find((data) => data.region === regionItem.name);
        const nextprice = regionData?.property[turn + 1]?.price || 0;
        return {
          ...regionItem,
          nextprice: nextprice,
        };
      });

      // 업데이트된 purchasedRegions로 상태 업데이트
      setPurchasedRegions(updatedPurchasedRegions);

    } else {

      let tmpSeedMoney = seedMoney;
      let totalPurchaseNum = 0;

      purchasedRegions.map((curRegion) => {
        totalPurchaseNum = totalPurchaseNum + curRegion.maxPurchaseNum;
      })


      if (purchasedRegions) { //구매 지역이 남아있으면
        purchasedRegions.map((curRegion) => {
          //시드머니에 추가
          const newPrices: Record<string, number> = {};
          gameData.forEach((regionData) => {
            const currentprice = regionData.property[turn - 1]?.price || 0;
            newPrices[regionData.region] = currentprice;
          })
          const currentPrice = (newPrices as Record<string, number>)[curRegion.name] || 0;

          // 양도소득세 계산
          if (currentPrice > curRegion.currentprice) {
            // 현재 가격이 구매 가격보다 높을 때만 양도소득세 계산
            let capitalGainsTax = 0; // 양도소득세
            const gain = (currentPrice - curRegion.currentprice) * curRegion.maxPurchaseNum; // 이익 계산

            // totalMaxPurchaseNum을 이용하여 조건 추가
            if (totalPurchaseNum <= 2) {
              if (gain <= 120) {
                capitalGainsTax = Math.floor(gain * 0.06); // 양도소득세 계산 및 저장
              } else if (gain > 120 && gain <= 460) {
                capitalGainsTax = Math.floor(gain * 0.15);
              } else if (gain > 460 && gain <= 880) {
                capitalGainsTax = Math.floor(gain * 0.24);
              } else if (gain > 880 && gain <= 1500) {
                capitalGainsTax = Math.floor(gain * 0.35);
              } else if (gain > 1500 && gain <= 3000) {
                capitalGainsTax = Math.floor(gain * 0.38);
              } else if (gain > 3000 && gain <= 5000) {
                capitalGainsTax = Math.floor(gain * 0.40);
              } else {
                capitalGainsTax = Math.floor(gain * 0.42);
              }
            } else if (totalPurchaseNum > 2 && totalPurchaseNum <= 5) {
              if (gain <= 120) {
                capitalGainsTax = Math.floor(gain * 0.06); // 양도소득세 계산 및 저장
              } else if (gain > 120 && gain <= 460) {
                capitalGainsTax = Math.floor(gain * 0.25);
              } else if (gain > 460 && gain <= 880) {
                capitalGainsTax = Math.floor(gain * 0.34);
              } else if (gain > 880 && gain <= 1500) {
                capitalGainsTax = Math.floor(gain * 0.45);
              } else if (gain > 1500 && gain <= 3000) {
                capitalGainsTax = Math.floor(gain * 0.48);
              } else if (gain > 3000 && gain <= 5000) {
                capitalGainsTax = Math.floor(gain * 0.50);
              } else {
                capitalGainsTax = Math.floor(gain * 0.52);
              }
            } else {
              if (gain <= 120) {
                capitalGainsTax = Math.floor(gain * 0.06); // 양도소득세 계산 및 저장
              } else if (gain > 120 && gain <= 460) {
                capitalGainsTax = Math.floor(gain * 0.35);
              } else if (gain > 460 && gain <= 880) {
                capitalGainsTax = Math.floor(gain * 0.44);
              } else if (gain > 880 && gain <= 1500) {
                capitalGainsTax = Math.floor(gain * 0.55);
              } else if (gain > 1500 && gain <= 3000) {
                capitalGainsTax = Math.floor(gain * 0.58);
              } else if (gain > 3000 && gain <= 5000) {
                capitalGainsTax = Math.floor(gain * 0.60);
              } else {
                capitalGainsTax = Math.floor(gain * 0.62);
              }
            }
          }

          tmpSeedMoney = tmpSeedMoney + (currentPrice * curRegion.maxPurchaseNum) - capitalGainsTax;

        });
      }
      //모달 띄우고 tmpSeedMoney 넘겨줌
      GamesetModalhandleOpen(tmpSeedMoney);
    }
  }, [turn, gameData, purchasedRegions]);

  function formatTime(second: number) {
    const min = Math.floor(second / 60);
    const sec = second % 60;
    return `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
  }

  useEffect(() => {
    const countDown = setInterval(() => {
      setTimeSecond((prevSecond: number) => {
        if (prevSecond <= 1) {
          alert('턴 종료')
          // 타이머가 0이 되면 자동으로 다음 턴으로 넘기기
          handleNextTurn();
          return 60;
        }
        return prevSecond - 1;
      });
    }, 1000);

    return () => {
      clearInterval(countDown);
    };
  }, [handleNextTurn]);

  useEffect(() => {
    // 여기에 사용할 토큰을 변수로 정의합니다.

    axios.get(`api/games/${GameTurns}`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
      .then(response => {
        setGameData(response.data);
      })
      .catch(error => console.log(error));
  }, [accessToken]);

  useEffect(() => {
    // 턴에 맞게 각 지역의 현재 가격 정보 가져와서 업데이트
    const newPrices: Record<string, number> = {};
    const newNews: Record<string, any[]> = {};

    gameData.forEach((regionData) => {
      const currentprice = regionData.property[turn - 1]?.price || 0;
      newPrices[regionData.region] = currentprice;
      // 해당 턴의 년월을 가져오기
      const currentYearMonth = regionData.property[turn - 1]?.period.substring(0, 6);

      // 해당 년월의 뉴스 데이터 가져오기
      const newsForTurn = regionData.news.filter((newsItem) => {
        const curYear = currentYearMonth.substring(0, 4);
        const curMonth = Number(currentYearMonth.substring(4, 6));
        const monthList = [curMonth - 2, curMonth - 1, curMonth];

        const newsYear = newsItem.publishedDt.substring(0, 4);
        const newsMonth = Number(newsItem.publishedDt.substring(4, 6));

        let flag = false;
        if (newsYear === curYear) {
          for (let month of monthList) {
            if (month === newsMonth) {
              flag = true;
              break;
            }
          }
        }
        if (flag) {
          return newsItem;
        }
      });

      if (newsForTurn.length > 0) {
        // 뉴스 배열이 있다면 추가
        newNews[regionData.region] = newsForTurn;
      }
    });
    // seedMoney를 하나의 useEffect 내에서 업데이트합니다.
    const updatedSeedMoney = seedMoney - comprehensiverRealEstateTax;
    setSeedMoney(updatedSeedMoney);
    setTotalComprehensiverRealEstateTax(totalComprehensiverRealEstateTax + comprehensiverRealEstateTax);
    setCurrentPrices(newPrices);
    setNewsData(newNews);
    NewsModalhandleOpen();
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
        const nextprice = selectedRegionData.property[turn]?.price || 0; // 선택한 턴의 가격을 가져오기

        if (currentprice > 0) {
          let acquisitionTax = 0;  // 취득세

          if (currentprice <= 150) {
            acquisitionTax = Math.floor(currentprice * 0.1);
          } else if (currentprice > 150 && currentprice <= 400) {
            acquisitionTax = Math.floor(currentprice * 0.15);
          } else if (currentprice > 400 && currentprice <= 750) {
            acquisitionTax = Math.floor(currentprice * 0.25);
          } else if (currentprice > 750 && currentprice <= 1000) {
            acquisitionTax = Math.floor(currentprice * 0.4);
          } else {
            acquisitionTax = Math.floor(currentprice * 0.4);
          }

          const regionName = selectedRegion; //구입한 지역명

          let tmpRegions = purchasedRegions;

          //이미 구입한 지역인지 확인하는 메서드
          let find = false;
          for (let curRegion of tmpRegions) {
            if (curRegion.name === regionName) {
              let curTotalPrice = curRegion.currentprice * curRegion.maxPurchaseNum;
              let buyTotalPrice = currentprice * maxPuerchaseNum;

              let finalTotalPrice = curTotalPrice + buyTotalPrice;
              let totalNum = curRegion.maxPurchaseNum + maxPuerchaseNum;

              curRegion.currentprice = Math.floor(finalTotalPrice / totalNum);
              curRegion.maxPurchaseNum = totalNum;

              find = true;
            }
          }

          setAcquisitionTax(acquisitionTax)
          const pay = (currentprice * maxPuerchaseNum) - (acquisitionTax * maxPuerchaseNum);
          const newSeedMoney = seedMoney - pay;
          if (newSeedMoney >= 0) {
            setSeedMoney(newSeedMoney);
            setTotalAcquisitionTax(totalAcquisitionTax + acquisitionTax);


            if (find) { //이전에 구입했던 지역이면
              setPurchasedRegions(tmpRegions);

            } else { //아닌 경우

              //새로 객체 만들어서
              const newRegion = {
                id: purchasedRegions.length + 1,
                name: selectedRegion,
                currentprice,
                maxPurchaseNum: maxPuerchaseNum, // maxPurchaseNum 추가
                nextprice,
              };
              //추가
              setPurchasedRegions((prevRegions) => [...prevRegions, newRegion]);
            }
            // setPurchasedRegions((prevRegions) => [...prevRegions, newRegion]);

            ModalhandleOpen();

            // 이 부분에서 currentprice를 buyPrice로 사용
            axios.post('/api/gameLog', {
              id: purchasedRegions.length + 1,
              region: selectedRegion,
              tradeNum: maxPuerchaseNum,
              buyPrice: currentprice, // 여기서 buyPrice로 사용
              sellPrice: -1,
              rate: -1,
              turn: turn,
            })
              .then(response => {
                console.log('redis로 구매 로그 전송완료')
              })
              .catch(error => console.log(error));

          } else {
            alert('잔액이 부족하여 구매할 수 없습니다.'); // 잔액이 부족할 때 알림창 띄우기
          }

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
      <div className={styles.LeftSideBar}>
        <div>
          <div className={styles.News}>
            <div className={styles.wrap} onClick={NewsModalhandleOpen}>
              뉴스 다시보기
            </div>
            <div className={styles.wrap} onClick={TaxModalhandleOpen}>
              세금 정책보기
            </div>
            <div className={styles.wrap} onClick={MyTaxModalhandleOpen}>
              내 세금 내역
            </div>
          </div>
        </div>
        <div>
          <div className={styles.Items}>
            <div className={styles.wrap}>
              {displayComponent}
            </div>
            <div className={styles.button}>
              <StyledSpeedDial
                ariaLabel="SpeedDial controlled open example"
                icon={<SpeedDialIcon />}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
                direction={direction}
                sx={{ '& .MuiFab-primary': { backgroundColor: 'rgba(150, 120, 120, 0.58)', color: 'white', '&:hover': { backgroundColor: 'rgba(150, 120, 120, 0.58)' } } }}
              >
                {actions.map((action) => (
                  <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onClick={() => {
                      if (action.name === '다음 시세') {
                        handlePriceClick();
                      } else if (action.name === '뉴스 추가') {
                        handleNewsClick();
                      } else if (action.name === '용어 검색') {
                        handleSearchClick();
                      }
                    }}
                  />
                ))}
              </StyledSpeedDial>
            </div>
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
              아이템 구매
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              성공적으로 아이템 구매가 완료되었습니다.
            </Typography>
          </Box>
        </Modal>
      </div>

      <div className={styles.GameMain}>
        <div className={styles.GameHeader}>
          {/* 타이머 */}
          <div className={styles.TimerWrap}>
            <div className={styles.Timer}>
              <AccessAlarmIcon />
              {formatTime(timeSecond)}
            </div>
          </div>

          {/* 턴 */}
          <div className={styles.TurnWrap}>
            <button type="button" className={styles.button}>
              <AutorenewIcon />
              {`${turn} / ${GameTurns}`}
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
              <AttachMoneyIcon />
              {seedMoney.toLocaleString()}원
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
                    className={`${styles.card} ${purchasedRegions.some((region) => region.name === regionData.region) ? styles.purchased : ''
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
                    (gameData.find((regionData) => regionData.region === selectedRegion)?.property[(turn - 1)]?.price || '0')
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
                    sx={{ padding: 0 }}
                  >
                    <ArrowDropUpIcon fontSize="large" />
                  </IconButton>
                  <IconButton
                    aria-label="minus"
                    onClick={() =>
                      handleMaxUserNumChange(maxPuerchaseNum - 1)
                    }
                    sx={{ padding: 0 }}
                  >
                    <ArrowDropDownIcon fontSize="large" />
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
            seedMoney={seedMoney} // seedMoney를 PurchaseList로 전달
            setSeedMoney={setSeedMoney} // setSeedMoney를 PurchaseList로 전달
            onComprehensiverRealEstateTaxUpdate={handleComprehensiverRealEstateTaxUpdate} // 콜백함수
            onsetcapitalGainsTaxUpdate={handlecapitalGainsTaxUpdate}
            turn={turn}
          />
        </div>
      </div>
      <ThemeProvider theme={theme}>
        <Modal
          open={Modalopen}
          onClose={() => {
            ModalhandleClose();
            setMaxPurchaseNum(1);
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <div style={{ fontSize: 35 }}>
                <span className={styles.mark}>{selectedRegion}에 아파트 {maxPuerchaseNum}채 구매가 완료되었습니다.</span>
              </div>
              <div style={{ fontSize: 25, marginTop: 10 }}>
                <div>구매가 : {total_currentPrice(currentPrices[selectedRegion], maxPuerchaseNum)}원</div>
                <div>취득세 : {total_acquisitionTax(acquisitionTax, maxPuerchaseNum)}원</div>
                <div style={{ color: '#EB2C00' }}>총가격 : {all_pay(currentPrices[selectedRegion], maxPuerchaseNum, acquisitionTax)}원</div>
              </div>
            </Typography>
          </Box>
        </Modal>
      </ThemeProvider>

      <ThemeProvider theme={theme}>
        <Modal
          open={TaxModalopen}
          onClose={TaxModalhandleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{ ...style, maxWidth: '800px', maxHeight: '600px', overflowY: 'auto' }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <span>
                세금 정책
              </span>
              <span style={{ fontFamily: 'Dovemayo_gothic', textAlign: 'right', fontSize: 20, marginLeft: 100, color: '#EB2C00' }}>
                게임의 재미를 위하여 실제 세금 정책보다 감면하였습니다.
              </span>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <div>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography sx={{ fontSize: 30 }}>취득세 <span style={{ fontSize: 20 }}> - 집을 구매할 당시 책정됩니다.</span></Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>과세 표준</TableCell>
                            <TableCell align="right">표준 세율</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows.map((row) => (
                            <TableRow
                              key={row.range}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                              <TableCell component="th" scope="row">
                                {row.range}
                              </TableCell>
                              <TableCell align="right">{row.percent}%</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography sx={{ fontSize: 30 }}>종합부동산세 <span style={{ fontSize: 20 }}> - 보유한 집 가격에 따라 책정됩니다.</span></Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>과세 표준</TableCell>
                            <TableCell align="right">표준 세율</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows1.map((row) => (
                            <TableRow
                              key={row.range}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                              <TableCell component="th" scope="row">
                                {row.range}
                              </TableCell>
                              <TableCell align="right">{row.percent}%</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography sx={{ fontSize: 30 }}>양도소득세 <span style={{ fontSize: 20 }}> - 집을 팔았을 시 이익이 생길시 책정됩니다.</span></Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>과세 표준</TableCell>
                            <TableCell align="right">표준 세율</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows2.map((row) => (
                            <TableRow
                              key={row.range}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                              <TableCell component="th" scope="row">
                                {row.range}
                              </TableCell>
                              <TableCell align="right">{row.percent}%</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </AccordionDetails>
                </Accordion>
              </div>
            </Typography>
          </Box>
        </Modal>
      </ThemeProvider>

      <ThemeProvider theme={theme}>
        <Modal
          open={NextPriceModalopen}
          onClose={NextPriceModalhandleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style2}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              다음 턴의 시세입니다.
            </Typography>
            <Box sx={{ mt: 2, maxHeight: '500px', overflowY: 'auto' }}>
              {purchasedRegions.map((regionItem, index) => (
                <div key={index} style={{ border: '1px solid #fdefd2', marginBottom: '10px', paddingTop: '5px', paddingLeft: '5px', backgroundColor: '#fdefd2', fontFamily: 'Dovemayo_gothic', display: 'flex' }}>
                  <div style={{ fontSize: 28, width: '50%', paddingLeft: 40 }}>{regionItem.name}</div>
                  <div style={{ fontSize: 25, width: '50%', textAlign: 'right', paddingRight: 40 }}>{regionItem.nextprice}원</div>
                </div>
              ))}
            </Box>
          </Box>
        </Modal>
      </ThemeProvider>

      <ThemeProvider theme={theme}>
        <Modal
          open={NewsModalopen}
          onClose={NewsModalhandleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{ ...style, maxWidth: '800px' }}>
            <Typography variant="h6" component="h2">
              {turn}번째 턴의 뉴스 스크랩
            </Typography>
            <Box sx={{ mt: 2, maxHeight: '500px', overflowY: 'auto', fontFamily: 'Dovemayo_gothic' }}>
              {Object.keys(newsData).map((regionName) => (
                <div key={regionName} style={{ border: '1px solid #fdefd2', marginBottom: '10px', paddingTop: '5px', paddingLeft: '5px', backgroundColor: '#fdefd2' }}>
                  <h3 style={{ fontSize: 28 }}>{regionName}</h3>
                  {/* 지역별 첫 번째 뉴스만 선택하여 표시 */}
                  {newsData[regionName][0] && (
                    <div>
                      <div style={{ fontSize: 16 }}>{newsData[regionName][0].publishedDt}</div>
                      <div style={{ fontSize: 22 }}>{newsData[regionName][0].title}</div>
                      <div style={{ fontSize: 18 }}>{newsData[regionName][0].summary}</div>
                    </div>
                  )}
                </div>
              ))}
            </Box>
          </Box>
        </Modal>
      </ThemeProvider>

      <ThemeProvider theme={theme}>
        <Modal
          open={AddNewsModalopen}
          onClose={AddNewsModalhandleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography variant="h6" component="h2">
              뉴스 추가 스크랩
            </Typography>
            <Box sx={{ mt: 2, maxHeight: '500px', overflowY: 'auto', fontFamily: 'Dovemayo_gothic' }}>
              {Object.keys(newsData).map((regionName) => {
                const secondNews = newsData[regionName][1];
                // 두 번째 뉴스가 존재하는 경우에만 표시
                if (secondNews) {
                  return (
                    <div key={regionName} style={{ border: '1px solid #fdefd2', marginBottom: '10px', paddingTop: '5px', paddingLeft: '5px', backgroundColor: '#fdefd2' }}>
                      <h3 style={{ fontSize: 28 }}>{regionName}</h3>
                      <div>
                        <div style={{ fontSize: 16 }}>{newsData[regionName][0].publishedDt}</div>
                        <div style={{ fontSize: 22 }}>{newsData[regionName][0].title}</div>
                        <div style={{ fontSize: 18 }}>{newsData[regionName][0].summary}</div>
                      </div>
                    </div>
                  );
                }
                // 두 번째 뉴스가 없는 경우에는 아무것도 표시하지 않음
                return null;
              })}
            </Box>
          </Box>
        </Modal>
      </ThemeProvider>

      <ThemeProvider theme={theme}>
        <Modal
          open={MyTaxModalopen}
          onClose={MyTaxModalhandleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style2}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              세금 정책
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <div style={{ backgroundColor: '#fdefd2' }}>
                <div style={{ display: 'flex' }}>
                  <div style={{ width: '50%', paddingLeft: 20 }}>취득세</div>
                  <div style={{ width: '50%', paddingRight: 20, textAlign: 'right' }}>- {totalAcquisitionTax} 원</div>
                </div>
                <div style={{ display: 'flex' }}>
                  <div style={{ width: '50%', paddingLeft: 20 }}>종합부동산세</div>
                  <div style={{ width: '50%', paddingRight: 20, textAlign: 'right' }}>- {totalComprehensiverRealEstateTax} 원</div>
                </div>
                <div style={{ display: 'flex' }}>
                  <div style={{ width: '50%', paddingLeft: 20 }}>양도소득세</div>
                  <div style={{ width: '50%', paddingRight: 20, textAlign: 'right' }}>- {totalCapitalGainsTax} 원</div>
                </div>
              </div>
            </Typography>
          </Box>
        </Modal>
      </ThemeProvider>

      <ThemeProvider theme={theme}>
        <Modal
          open={SalaryModalopen}
          onClose={SalaryModalhandleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style2}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              알림
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <span className={styles.mark}>
                월급(500원)이 들어왔습니다.
              </span>
            </Typography>
          </Box>
        </Modal>
      </ThemeProvider>

      <ThemeProvider theme={theme}>
        <Modal
          open={GamesetModalopen}
          onClose={GamesetModalhandleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style3}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              게임종료
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <div>
                {calculateProfitRate(GameTurns, finalSeedMoney)}
              </div>
            </Typography>
          </Box>
        </Modal>
      </ThemeProvider>

    </div>
  );
};

export default GameMain;

// 구매 총 가격 구하기
function all_pay(currentPrice: number, maxPuerchaseNum: number, acquisitionTax: number) {
  return (currentPrice * maxPuerchaseNum) + acquisitionTax
}
function total_currentPrice(currentPrice: number, maxPuerchaseNum: number) {
  return (currentPrice * maxPuerchaseNum)
}
function total_acquisitionTax(acquisitionTax: number, maxPuerchaseNum: number) {
  return (acquisitionTax * maxPuerchaseNum)
}
function calculateProfitRate(turn: number, endmoney: number) {
  const profitRate = ((endmoney) - (5000 + ((turn - 1) * 500))) / (5000 + ((turn - 1) * 500)) * 100;
  const formattedProfitRate = profitRate.toFixed(2); // 소수점 2자리까지 반올림하여 문자열로 반환

  if (profitRate > 0) {
    return <span className={`${styles.positive_profit}`}>수익률: {formattedProfitRate}%</span>;
  } else if (profitRate < 0) {
    return <span className={`${styles.negative_profit}`}>수익률: {formattedProfitRate}%</span>;
  } else {
    return <span>수익률: {formattedProfitRate}%</span>;
  }
}
