import React  , { useState} from 'react';
import styles from "./page.module.css";
import { Button } from "@mui/material";
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import beavor from "../../../public/images/beaver.gif"
import Image from "next/image";
import { useRouter } from 'next/navigation';



const startBar = () => {
  const router = useRouter();

  const [timer, setTimer] = useState<string>('90'); // 초기 선택 값을 설정
  const [turns, setTurns] = useState<string>('10'); // 초기 선택 값을 설정


  // 라디오 버튼 그룹의 변경 핸들러
  const timerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue2 = event.target.value;
    setTimer(newValue2);
  };

  const turnsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setTurns(newValue);
  };

  const gogoairplane = ()=>{
    console.log( turns +" "+timer);
    localStorage.setItem('Time', timer);;
    localStorage.setItem('Turns', turns);
    router.push('/game');
  }

  return (
    <div className={styles.StartBar1}>
      <div>

      </div>
      <div>
        <div className={styles.turn}>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label" className={styles.check}>턴수</FormLabel>
            <RadioGroup
              onChange={turnsChange}
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel value='10' control={<Radio />} label="10턴" />
              <FormControlLabel value="15" control={<Radio />} label="15턴" />
              <FormControlLabel value="20" control={<Radio />} label="20턴" />
            </RadioGroup>
          </FormControl>
        </div>
        <br></br>
        <div className={styles.time}>
          <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label" className={styles.check} >제한시간</FormLabel>
              <RadioGroup
                onChange={timerChange}
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel value="90" control={<Radio />} label="90초" />
                <FormControlLabel value="180" control={<Radio />} label="180초" />
                <FormControlLabel value="300" control={<Radio />} label="300초" />
              </RadioGroup>
            </FormControl>
        </div>
        <br></br>
        <div className={styles.bb}>
          <Button onClick={gogoairplane} variant="outlined"  className={`${styles.stbnt} `} >시작</Button>
        </div>
      </div>
      <div>

      </div>
      <div>
          <Image src={beavor} alt="slide" width={300} height={300}></Image>
      </div>
      <div>
        
      </div>
    </div>
  );
};

export default startBar;
