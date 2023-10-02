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
    <div className={styles.PriceWon}> 3,000 시드 </div>
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
      <div className={styles.NewsWon}> 3,000 시드 </div>
      <div className={styles.NewsButtonWrap}><button className={styles.NewsButton} onClick={onBuyClick}>구매</button></div>
    </div>
  </div>
);

// SearchComponent 추가
const SearchComponent = () => {
  // 검색 기능
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

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
            const originalString = finalResponse.data.items[0].description; //검색 결과
            //검색 결과에서 설명 부분만 추출
            const startIndex = originalString.indexOf("</b>");
            const endIndex = originalString.indexOf("<b>", startIndex);
            console.log(endIndex)
            console.log(startIndex)
            if (startIndex !== -1 && endIndex !== -1) {
              const extractedText = originalString.substring(startIndex + 4, endIndex);
              setSearchResults(extractedText);
            }
          })
        }
      })
      .catch((error) => {
        console.error('에러:', error);
      });
  }
  return(
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
  const [currentPrices, setCurrentPrices] = useState<Record<string, number>>({});
  const [newsData, setNewsData] = useState<Record<string, { title: string; summary: string; publishedDt: string }[]>>({});

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
    setDisplayComponent(<NewsComponent onBuyClick={handleDecreaseAddNews}/>);
    handleClose();
  };

  const handleSearchClick = () => {
    // '용어 검색' 버튼이 클릭되었을 때 실행할 동작
    setDisplayComponent(<SearchComponent/>);
    handleClose();
  };
  
  const handleDecreaseNextMoney = () => { // 시드머니를 활용해서 아이템 다음시세 구매
    if (seedMoney > 0) {
      const newSeedMoney = seedMoney - 3000; // 예를 들어 1000씩 감소
      setSeedMoney(newSeedMoney); // 변경사항을 부모 컴포넌트에 전달
      console.log('구매 완료')
      NextPriceModalhandleOpen();
    }
  };
  const handleDecreaseAddNews = () => { // 시드머니를 활용해서 아이템 뉴스 추가 구매
    if (seedMoney > 0) {
      const newSeedMoney = seedMoney - 3000; // 예를 들어 1000씩 감소
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
  const [timeSecond, setTimeSecond] = useState(60);
  const [turn, setTurn] = useState(1);

  const handleNextTurn = useCallback(() => {
    if (turn < 10) {
      setTurn(turn + 1);
      // 턴이 증가할 때 타이머 초기화
      setTimeSecond(60);
      // purchasedRegions 배열의 각 항목의 nextprice 업데이트
      const updatedPurchasedRegions = purchasedRegions.map((regionItem) => {
        // gameData에서 해당 지역의 새로운 턴의 정보를 가져와서 nextprice 업데이트
        const regionData = gameData.find((data) => data.region === regionItem.name);
        const nextprice = regionData?.property[turn+1]?.price || 0;
        return {
          ...regionItem,
          nextprice: nextprice,
        };
      });

      // 업데이트된 purchasedRegions로 상태 업데이트
      setPurchasedRegions(updatedPurchasedRegions);

    } else {
      alert('게임 종료')
    }
  }, [turn, gameData, purchasedRegions]);

  function formatTime(second: number) {
    const min = Math.floor(second / 60);
    const sec = second % 60;
    return `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
  }

  useEffect(() => {
    const countDown = setInterval(() => {
      setTimeSecond((prevSecond) => {
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

    axios.get('api/games/10', {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
      .then(response => {
        console.log(response.data);
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
        const newsYearMonth = newsItem.publishedDt.substring(0, 6);
        return newsYearMonth === currentYearMonth;
      });
      if (newsForTurn.length > 0) {
        // 뉴스 배열이 있다면 추가
        newNews[regionData.region] = newsForTurn;
      }
    });
    console.log('종합부동산세:',comprehensiverRealEstateTax)
    setSeedMoney(seedMoney - comprehensiverRealEstateTax);
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
          
          if (currentprice <= 300) {
            acquisitionTax = Math.floor(currentprice * 0.1);
          } else if (currentprice > 300 && currentprice <= 800) {
            acquisitionTax = Math.floor(currentprice * 0.15);
          } else if (currentprice > 800 && currentprice <= 1500) {
            acquisitionTax = Math.floor(currentprice * 0.25);
          } else if (currentprice > 1500 && currentprice <= 3000) {
            acquisitionTax = Math.floor(currentprice * 0.4);
          } else {
            acquisitionTax = Math.floor(currentprice * 0.4);
          }

          const newRegion = {
            id: purchasedRegions.length + 1,
            name: selectedRegion,
            currentprice,
            maxPurchaseNum: maxPuerchaseNum, // maxPurchaseNum 추가
            nextprice,
          };
          setAcquisitionTax(acquisitionTax)
          const newSeedMoney = seedMoney - (currentprice * maxPuerchaseNum) - acquisitionTax;
          setSeedMoney(newSeedMoney);
          console.log('구매 완료');
          console.log('취득세', acquisitionTax)
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
              sx={{ '& .MuiFab-primary': { backgroundColor: 'rgba(150, 120, 120, 0.58)', color: 'white', '&:hover': {backgroundColor: 'rgba(150, 120, 120, 0.58)'}  } }}
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
          />
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

      <Modal
        open={TaxModalopen}
        onClose={TaxModalhandleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            세금 정책
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div>
              취득세 : 집을 구매할 당시 책정됩니다.
            </div>
            <div>
              종합부동산세 : 보유한 집 가격에 따라 책정됩니다.
            </div>
            <div>
              양도소득세 : 집을 팔았을 시 이익이 생길시 책정됩니다.
            </div>
          </Typography>
        </Box>
      </Modal>

      <Modal
        open={NextPriceModalopen}
        onClose={NextPriceModalhandleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            다음 턴의 시세입니다.
          </Typography>
          <Box sx={{ mt: 2, maxHeight: '500px', overflowY: 'auto' }}>
            {purchasedRegions.map((regionItem, index) => (
              <div key={index}>
                <div>{regionItem.name}</div>
                <div>{regionItem.nextprice}</div>
                <div>----------------------------------------------------------</div>
              </div>
            ))}
          </Box>
        </Box>
      </Modal>

      <Modal
        open={NewsModalopen}
        onClose={NewsModalhandleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, maxWidth: '800px' }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {turn}번째 턴의 뉴스입니다.
          </Typography>
          <Box sx={{ mt: 2, maxHeight: '500px', overflowY: 'auto' }}>
            {Object.keys(newsData).map((regionName) => (
              <div key={regionName}>
                <h3>{regionName} 지역 뉴스</h3>
                {/* 지역별 첫 번째 뉴스만 선택하여 표시 */}
                {newsData[regionName][0] && (
                  <div>
                    <div>{newsData[regionName][0].publishedDt}</div>
                    <div>{newsData[regionName][0].title}</div>
                    <div>{newsData[regionName][0].summary}</div>
                    <div>--------------------------------------------------------------------------------------------------------</div>
                  </div>
                )}
              </div>
            ))}
          </Box>
        </Box>
      </Modal>

      <Modal
        open={AddNewsModalopen}
        onClose={AddNewsModalhandleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            뉴스 추가 구매 모달
          </Typography>
          <Box sx={{ mt: 2, maxHeight: '500px', overflowY: 'auto' }}>
            {Object.keys(newsData).map((regionName) => {
              const secondNews = newsData[regionName][1];
              // 두 번째 뉴스가 존재하는 경우에만 표시
              if (secondNews) {
                return (
                  <div key={regionName}>
                    <h3>{regionName} 지역 뉴스</h3>
                    <div>
                      <div>{secondNews.publishedDt}</div>
                      <div>{secondNews.title}</div>
                      <div>{secondNews.summary}</div>
                      <div>--------------------------------------------------------------------------------------------------------</div>
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
      
      <Modal
        open={MyTaxModalopen}
        onClose={MyTaxModalhandleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            세금 정책
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div>
              취득세 : {acquisitionTax}
            </div>
            <div>
              종합부동산세 : {comprehensiverRealEstateTax}
            </div>
            <div>
              양도소득세 : {capitalGainsTax}
            </div>
          </Typography>
        </Box>
      </Modal>

    </div>
  );
};

export default GameMain;
