'use client';
import React from 'react';
import styles from './Session.module.css';

const Session = () => {
    const Rest_api_key='45ea23576846eddff5204386c19df7b2' //REST API KEY
    const redirect_uri = 'http://localhost:3000/nickname' //Redirect URI
    // oauth 요청 URL
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`
    const handleLogin = ()=>{
    window.location.href = kakaoURL
  }

  return (
    <div className={styles.session}>
      <button onClick={handleLogin} type='button' className={styles.button}>
        로그인
      </button>
    </div>
  );
};

export default Session;