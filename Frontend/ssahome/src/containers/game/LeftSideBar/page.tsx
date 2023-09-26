'use client'

import React, { useState } from 'react';
import styles from './page.module.css'

import News from './News/page';
import { styled } from '@mui/material/styles';
import SpeedDial, { SpeedDialProps } from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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

// seedMoney 및 setSeedMoney prop을 타입으로 정의
type LeftSideBarProps = {
  seedMoney: number;
  setSeedMoney: (value: number) => void;
};

// PriceComponent 추가
interface PriceComponentProps {
  onBuyClick: () => void; // onBuyClick prop의 타입을 명시적으로 지정
}

const PriceComponent: React.FC<PriceComponentProps> = ({ onBuyClick }) => (
  <div className={styles.PriceWrap}>
    <div className={styles.PriceTitle}>다음 시세 구매</div>
    <div className={styles.PriceContent}>집을 보유하고 있는 지역의 다음 턴 시세 정보를 미리 확인할 수 있습니다.</div>
    <div className={styles.PriceWon}> 구매가 : 5000 </div>
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
      <div className={styles.NewsWon}> 구매가 : 3000 </div>
      <div className={styles.NewsButtonWrap}><button className={styles.NewsButton} onClick={onBuyClick}>구매</button></div>
    </div>
    <div className={styles.NewsContent}>
      <div className={styles.NewsTitle1}>고급 정보 구매</div>
      <div className={styles.NewsTitle2}>제공받은 기본뉴스에 해당하는 고급정보를 추가로 확인할 수 있습니다.</div>
      <div className={styles.NewsWon}> 구매가 : 3000 </div>
      <div className={styles.NewsButtonWrap2}><button className={styles.NewsButton} onClick={onBuyClick}>구매</button></div>
    </div>
  </div>
);

// SearchComponent 추가
const SearchComponent = () => (
  <div className={styles.SearchWrap}>
    <div className={styles.SearchButton}>
      <input type="text" className={styles.search_input} placeholder="용어 검색" />
      <button className={styles.search_button}>
        <svg className={styles.search_icon} aria-hidden="true" viewBox="0 0 24 24">
            <g>
              <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
            </g>
        </svg>
    </button>
    </div>
    <div className={styles.SearchContent}>
      용어 설명 창
    </div>
  </div>
);

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


const LeftSideBar: React.FC<LeftSideBarProps> = ({ seedMoney, setSeedMoney }) => {
  const [Modalopen, setModalOpen] = React.useState(false);
  const ModalhandleOpen = () => setModalOpen(true);
  const ModalhandleClose = () => setModalOpen(false);

  const [direction, setDirection] =
    React.useState<SpeedDialProps['direction']>('right');

  const [open, setOpen] = React.useState(false);
  const [displayComponent, setDisplayComponent] = useState<React.ReactNode>(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
      const newSeedMoney = seedMoney - 5000; // 예를 들어 1000씩 감소
      setSeedMoney(newSeedMoney); // 변경사항을 부모 컴포넌트에 전달
      console.log('구매 완료')
      ModalhandleOpen();
    }
  };
  const handleDecreaseAddNews = () => { // 시드머니를 활용해서 아이템 뉴스 추가 구매
    if (seedMoney > 0) {
      const newSeedMoney = seedMoney - 3000; // 예를 들어 1000씩 감소
      setSeedMoney(newSeedMoney); // 변경사항을 부모 컴포넌트에 전달
      console.log('구매 완료')
      ModalhandleOpen();
    }
  };
  
  return (
    <div className={styles.LeftSideBar}>
      <div>
        <News/>
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
  );
};

export default LeftSideBar;
