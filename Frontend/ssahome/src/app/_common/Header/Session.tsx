'use client';
import React, { useState, useEffect } from 'react';
import styles from './Session.module.css';
import axios from 'axios';
// import { ROUTES } from './constants';
import { useRouter } from 'next/navigation';

const Rest_api_key = '45ea23576846eddff5204386c19df7b2' //REST API KEY
const redirect_uri = 'http://localhost:3000/main' //Redirect URI


const Session = () => {

  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리

  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`
  const handleLogin = () => {
    window.location.href = kakaoURL
  }

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setIsLoggedIn(true);
    }

    const tmpcode = new URL(window.location.href).searchParams.get("code");

    if (tmpcode != null) {
      getCallBack(tmpcode); // 코드가 있을 때만 실행
    }


  }, []);

  const getCallBack = async (tmpcode: string) => {
    console.log("실행");

    axios
      .get(
        `api/auth/login?code=${tmpcode}`)
      .then((jwtToken) => {

        if (!jwtToken.data.isNew) {
          localStorage.setItem(
            "accessToken",
            JSON.stringify(jwtToken.data.jwt)
          );
          setIsLoggedIn(true);


        } else {
          localStorage.setItem(
            "tmpAccessToken",
            JSON.stringify(jwtToken.data.jwt)
          );
          alert("가입해주셔서 감사합니다. 닉네임 설정을 부탁드립니다.");
          router.push('/nickname');
        }

      })
      .catch((error) => {
        console.log(error)
        alert("회원정보가 존재 하지 않습니다.");
        window.location.replace("/");
      });
  };

  const Logout = () => {
    localStorage.removeItem('accessToken'); // 토큰을 로컬 스토리지에서 삭제
    window.location.replace("/");
  };



  return (

    <div className={styles.session}>
      {isLoggedIn ? (
        <button onClick={Logout} type="button" className={styles.button}>
          로그아웃
        </button>
      ) : (
        <button onClick={handleLogin} type="button" className={styles.button}>
          로그인
        </button>
      )}
    </div>
  );
};

export default Session;
