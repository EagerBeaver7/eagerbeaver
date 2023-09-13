import React from 'react';
import styles from "./page.module.css";
import  {Button}  from "@mui/material";
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';



const startBar = () => {
  return (
    <div className={styles.StartBar1}>
      <div className={styles.cont}>
        <div>
          <img src="img/beaver.gif" style={{ width: '100%', height: '100%', margin: '0',padding:'0'}}/>
        </div>
        <div className={styles.turn}>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">턴수</FormLabel>
            <RadioGroup
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
              <FormLabel id="demo-row-radio-buttons-group-label">제한시간</FormLabel>
              <RadioGroup
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
        <div className={styles.bb}>
          <Button variant="outlined"  className={`${styles.bnt} `} >시작</Button>
        </div>
      </div>
    </div>
  );
};

export default startBar;