import * as React from 'react';
import { Button, ButtonGroup, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import styles from './page.module.css';
import Image from 'next/image';
import beaver1 from "C:\Users\SSAFY\eagerbeaver\Frontend\ssahome\public\img\IMG_0706.PNG";
import beaver2 from "C:\Users\SSAFY\eagerbeaver\Frontend\ssahome\public\img\IMG_0707.PNG";
import beaver3 from "C:\Users\SSAFY\eagerbeaver\Frontend\ssahome\public\img\IMG_0708.PNG";
import beaver4 from "C:\Users\SSAFY\eagerbeaver\Frontend\ssahome\public\img\IMG_0709.PNG";
import beaver5 from "C:\Users\SSAFY\eagerbeaver\Frontend\ssahome\public\img\IMG_0710.PNG";
import beaver6 from "C:\Users\SSAFY\eagerbeaver\Frontend\ssahome\public\img\IMG_0711.PNG";
import Link from 'next/link';


const BeaverAvata = () => {
  const buttonClick = () => {

  }

  return (
    <ButtonGroup className={styles.pic} >
      <ImageList cols={3} rowHeight={280}>
        {itemData.map((item) => (
          <ImageListItem key={item.img} className={styles.picList}>
            <Button sx={{ boxShadow: 5, outlineColor: '#6B99C3' }} onClick={buttonClick}>
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