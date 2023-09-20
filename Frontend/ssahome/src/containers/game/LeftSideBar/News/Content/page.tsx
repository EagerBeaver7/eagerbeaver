'use client'

import React from 'react';
import styles from './page.module.css'

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

const steps = [
  {
    label: '수인분당선 2026년 개통 ',
    description: `디씨알이는 사업비 491억원과 학익역 운영 시 예상되는 영업손실 보전금 연 4억5000만원을 부담한다. 국가철도공단(KR)과 한국철도공사(korail, 코레일)은 사업 시행과 운영을 맡고 인천시는 학익역 건설에 행정지원을 하기로 했다.

    코레일과 KR은 올해 하반기 2단계 사업을 위한 기본·실시 설계를 완료한 후 내년 상반기 착공할 계획이다. 이르면 2026년 상반기 개통하는 게 목표다.
    
    `,
  },
  {
    label: 'Create an ad group',
    description:
      'An ad group contains one or more ads which target a shared set of keywords.',
  },
  {
    label: 'Create an ad',
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.`,
  },
  {
    label: 'Create an ad',
    description: `An ad group contains one or more ads which target a shared set of keywords.`,
  },
];

const Content = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = steps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className={styles.Content}>
      <div className={styles.wrap}>
        <Box>
          <Paper
            square
            elevation={0}
            sx={{
              display: 'flex',
              alignItems: 'center',
              height: 25,
              pl: 2,
              bgcolor: '#fff',
            }}
          >
            <Typography
            sx={{
              fontFamily:'Dovemayo_gothic',
              fontSize: 20,
            }}
            >{steps[activeStep].label}</Typography>
          </Paper>
          <Box sx={{ height: 180, maxWidth: 180, width: '100%', p: 2, overflowY: 'auto'}}>
            {steps[activeStep].description}
          </Box>
          <MobileStepper
            variant="text"
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            sx={{
              bgcolor: '#fff',
            }}
            nextButton={
              <Button
                size="small"
                onClick={handleNext}
                disabled={activeStep === maxSteps - 1}
                sx={{
                  fontFamily:'Dovemayo_gothic',
                }}
              >
                Next
                {theme.direction === 'rtl' ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button size="small" onClick={handleBack} disabled={activeStep === 0} sx={{
                fontFamily:'Dovemayo_gothic',
              }}>
                {theme.direction === 'rtl' ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                Back
              </Button>
            }
          />
        </Box>
      </div>
    </div>
    
  );
};

export default Content;
