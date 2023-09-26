'use client'

import React, { useState } from 'react';
import styles from './page.module.css'

import { styled } from '@mui/material/styles';
import SpeedDial, { SpeedDialProps } from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import SearchIcon from '@mui/icons-material/Search';

// PriceComponent 추가
const PriceComponent = () => (
  <div className={styles.PriceWrap}>
    <div className={styles.PriceTitle}>다음 시세 구매</div>
    <div className={styles.PriceContent}>집을 보유하고 있는 지역의 다음 턴 시세 정보를 미리 확인할 수 있습니다.</div>
    <div className={styles.ButtonWrap}><button className={styles.Button}>구매</button></div>
  </div>
);

// NewsComponent 추가
const NewsComponent = () => (
  <div className={styles.NewsWrap}>
    <div className={styles.NewsContent}>
      <div className={styles.NewsTitle1}>뉴스 추가 구매</div>
      <div className={styles.NewsTitle2}>다른 기본뉴스를 추가로 하나 더 확인할 수 있습니다</div>
      <div className={styles.NewsButtonWrap}><button className={styles.NewsButton}>구매</button></div>
    </div>
    <div className={styles.NewsContent}>
      <div className={styles.NewsTitle1}>고급 정보 구매</div>
      <div className={styles.NewsTitle2}>제공받은 기본뉴스에 해당하는 고급정보를 추가로 확인할 수 있습니다.</div>
      <div className={styles.NewsButtonWrap2}><button className={styles.NewsButton}>구매</button></div>
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

const Items = () => {
  const [direction, setDirection] =
    React.useState<SpeedDialProps['direction']>('right');

  const [open, setOpen] = React.useState(false);
  const [displayComponent, setDisplayComponent] = useState<React.ReactNode>(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handlePriceClick = () => {
    // '다음 시세' 버튼이 클릭되었을 때 실행할 동작
    setDisplayComponent(<PriceComponent/>);
    handleClose();
  };

  const handleNewsClick = () => {
    // '뉴스 추가' 버튼이 클릭되었을 때 실행할 동작
    setDisplayComponent(<NewsComponent/>);
    handleClose();
  };

  const handleSearchClick = () => {
    // '용어 검색' 버튼이 클릭되었을 때 실행할 동작
    setDisplayComponent(<SearchComponent/>);
    handleClose();
  };

  return (
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
  );
};

export default Items;
