
import * as React from 'react';
import { Button, ButtonGroup, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import styles from './page.module.css';
import Image from 'next/image';
import beaver1 from "../../../public/images/IMG_0706.png";
import beaver2 from "../../../public/images/IMG_0707.png";
import beaver3 from "../../../public/images/IMG_0708.png";
import beaver4 from "../../../public/images/IMG_0709.png";
import beaver5 from "../../../public/images/IMG_0710.png";
import beaver6 from "../../../public/images/IMG_0711.png";
import Link from 'next/link';
import axios from "axios";


const BeaverAvata = () => {
  const buttonClick = (i: number) => {
    const nickName = localStorage.getItem("nickname");
    // 현재 토큰이 localStorage에 담겨있는 상태이니까
    // localStorage에서 빼자
    let tmp = localStorage.getItem("tmpAccessToken");
    if (tmp) {
      tmp = JSON.parse(tmp)
    }
    const accessToken = tmp;
    const imgNum = i + 1;
    const data = {
      "nickname": nickName,
      "imgNum": imgNum
    }

    // 사진을 선택했을 때 userId, NickName, profileimg가 같이 넘어가게! JSON 형식으로 주자
    axios.put('api/user',
      data,

      { headers: { Authorization: `Bearer ${accessToken}` } }

    );
  }

  return (
    <ButtonGroup className={styles.pic} >
      <ImageList cols={3} rowHeight={280}>
        {itemData.map((item, i) => (
          <ImageListItem key={item.author} className={styles.picList}>
            <Button sx={{ boxShadow: 5, outlineColor: '#6B99C3' }} onClick={() => { buttonClick(i) }}>
              <Link href="/main">
                <Image
                  src={item.img}
                  alt={item.title}
                  width={260}
                  height={260}
                  loading="lazy"
                />
                <ImageListItemBar className={styles.name} position="bottom" title={item.author} />
              </Link>
            </Button>
          </ImageListItem>
        ))}
      </ImageList>
    </ButtonGroup>


  );
};

const itemData = [
  {
    img: beaver1,
    title: 'beaver1',
    author: '제이미 올비버',
  },
  {
    img: beaver2,
    title: 'beaver2',
    author: '구민석',
  },
  {
    img: beaver3,
    title: 'beaver3',
    author: '뜨또',
  },
  {
    img: beaver4,
    title: 'beaver4',
    author: '저스틴',
  },
  {
    img: beaver5,
    title: 'beaver5',
    author: '신입비버',
  },
  {
    img: beaver6,
    title: 'beaver6',
    author: 'なるほど',
  },
];

export default BeaverAvata;