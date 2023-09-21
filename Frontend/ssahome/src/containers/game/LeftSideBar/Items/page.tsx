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
    다음 시세 구매
  </div>
);

// NewsComponent 추가
const NewsComponent = () => (
  <div className={styles.NewsWrap}>
    <div className={styles.NewsContent}>
      기본 뉴스 추가
    </div>
    <div className={styles.NewsContent}>
      고급 뉴스 추가
    </div>
  </div>
);

// SearchComponent 추가
const SearchComponent = () => (
  <div className={styles.SearchWrap}>
    <div className={styles.SearchButton}>
      용어 검색 창
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
