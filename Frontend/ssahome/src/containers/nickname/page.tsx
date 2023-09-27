'use client'

import React, { useState, ChangeEvent, useEffect } from 'react';
import styles from './page.module.css';
import { Button } from '@mui/material';
import axios from "axios";
import { debounce } from "lodash";
import { useRouter } from 'next/navigation';


const NickNamePage: React.FC = () => {
  const [inputCount, setInputCount] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>('');
  const [isDuplicate, setIsDuplcate] = useState<boolean>(false); // 중복 여부 상태 추가
  const router = useRouter();

  // debounce 함수를 사용하여 GET 요청을 보내는 함수
  const debounceSearch = debounce(async (value: string) => {

    if (value.length > 0) {
      const response = await axios.get(`api/nickname/${value}`);
      setIsDuplcate(response.data); // 백에서 받은 데이터를 상태에 설정
    }
  }, 100);

  const onInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length >= 0 && value.length <= 10) {
      setInputValue(value);
      setInputCount(value.length);
      // debounce 함수 호출
      debounceSearch(value);
    }
  };

  // 입력 값이 변경될 때([inputValue]) 중복 여부 초기화
  useEffect(() => {
    setIsDuplcate(false);
  }, [inputValue]);


  // 다음 버튼 누르면 닉네임이 프로필 화면으로 넘어간다.
  const handleDetailPost = () => {

    if (inputCount === 0 || inputValue.trim() === '') {
      alert("닉네임 설정이 필요합니다.");
    } else if (isDuplicate) {
      alert("중복된 닉네임이 있습니다. 변경해주세요");
    } else {
      localStorage.setItem(
        "nickname",
        inputValue
      );
      router.push('/profileimg');
    }
  };

  return (
    <main className={styles.nickname}>
      <div className={styles.centering}>
        <div className={styles.title}>
          닉네임을 설정하세요.
        </div>
        <div className={styles.content}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              value={inputValue}
              onChange={onInputHandler}
            />
          </div>
          <div className={styles.counting}>
            <span>{inputCount}</span>
            <span>/10</span>
          </div>
        </div>
        {inputValue.length > 0 && isDuplicate && (
          <div className={styles.message}>
            * 중복된 닉네임입니다. *
          </div>
        )}
      </div>
      <Button className={styles.start} onClick={() => handleDetailPost()}>다음</Button>
    </main>
  );
};

export default NickNamePage;