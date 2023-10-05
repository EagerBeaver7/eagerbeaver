import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import { Button } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import beavor from "/public/images/beaver.gif";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { GiBirchTrees } from "react-icons/gi";

const startBar = () => {
  const router = useRouter();

  const [timer, setTimer] = useState<string>("90"); // 초기 선택 값을 설정
  const [turns, setTurns] = useState<string>("10"); // 초기 선택 값을 설정

  // 페이지 로드 시 로컬 스토리지에서 값을 가져와서 초기화
  useEffect(() => {
    // const storedValue = localStorage.getItem('selectedTime');
    // if (storedValue) {
    //   setTimer(storedValue);
    // }
  }, []);

  // 라디오 버튼 그룹의 변경 핸들러
  const timerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue2 = event.target.value;
    setTimer(newValue2);
  };

  const turnsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setTurns(newValue);
  };

  const gogoairplane = () => {
    console.log(turns + " " + timer);
    localStorage.setItem("Time", timer);
    localStorage.setItem("Turns", turns);
    router.push("/game");
  };

  return (
    <div className={styles.StartBar1}>
      <div className={styles.setting}>
        <div>
          <Image className={styles.playBeaver} src={beavor} alt="slide"></Image>
          <Image className={styles.playBeaver} src={beavor} alt="slide"></Image>
          <Image className={styles.playBeaver} src={beavor} alt="slide"></Image>
        </div>
        <div className={styles.turnTime}>
          <div className={styles.turnTimeSetting}>
            <FormControl>
              <FormLabel
                id="demo-row-radio-buttons-group-label"
                className={styles.check}
              >
                턴 수
              </FormLabel>
              <RadioGroup
                onChange={turnsChange}
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="10"
                  control={
                    turns === "10" ? (
                      <div className={styles.choiceRadio}>
                        <GiBirchTrees size="25px" color="#9A6B4B" />
                      </div>
                    ) : (
                      <Radio />
                    )
                  }
                  label="10턴"
                />
                <FormControlLabel
                  value="15"
                  control={
                    turns === "15" ? (
                      <div className={styles.choiceRadio}>
                        <GiBirchTrees size="25px" color="#9A6B4B" />
                      </div>
                    ) : (
                      <Radio />
                    )
                  }
                  label="15턴"
                />
                <FormControlLabel
                  value="20"
                  control={
                    turns === "20" ? (
                      <div className={styles.choiceRadio}>
                        <GiBirchTrees size="25px" color="#9A6B4B" />
                      </div>
                    ) : (
                      <Radio />
                    )
                  }
                  label="20턴"
                />
              </RadioGroup>
            </FormControl>
          </div>
        </div>
        <br></br>
        <div className={styles.turnTime}>
          <div className={styles.turnTimeSetting}>
            <FormControl>
              <FormLabel
                id="demo-row-radio-buttons-group-label"
                className={styles.check}
              >
                제한시간
              </FormLabel>
              <RadioGroup
                onChange={timerChange}
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="90"
                  control={
                    timer === "90" ? (
                      <div className={styles.choiceRadio}>
                        <GiBirchTrees size="25px" color="#9A6B4B" />
                      </div>
                    ) : (
                      <Radio />
                    )
                  }
                  label="90초"
                />
                <FormControlLabel
                  value="180"
                  control={
                    timer === "180" ? (
                      <div className={styles.choiceRadio}>
                        <GiBirchTrees size="25px" color="#9A6B4B" />
                      </div>
                    ) : (
                      <Radio />
                    )
                  }
                  label="180초"
                />
                <FormControlLabel
                  value="300"
                  control={
                    timer === "300" ? (
                      <div className={styles.choiceRadio}>
                        <GiBirchTrees size="25px" color="#9A6B4B" />
                      </div>
                    ) : (
                      <Radio />
                    )
                  }
                  label="300초"
                />
              </RadioGroup>
            </FormControl>
          </div>
        </div>
        <div className={styles.bb}>
          <Button
            onClick={gogoairplane}
            variant="outlined"
            className={`${styles.stbnt} `}
          >
            시작
          </Button>
        </div>
      </div>
    </div>
  );
};

export default startBar;
