import * as React from 'react';
import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import styles from './page.module.css';
import Image from 'next/image';

const BeaverAvata = () => {
  return (
    <ImageList className={styles.pic} cols={3} rowHeight={200}>
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <Image
            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
            alt={item.title}
            width={200}
            height={150}
            loading="lazy"
          />
          <ImageListItemBar position="below" title={item.author} />
        </ImageListItem>
      ))}
    </ImageList>


  );
};

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1549388604-817d15aa0110',
    title: 'Bed',
    author: '오늘도 열정적으로 집을 짓는 저스틴',
  },
  {
    img: 'https://images.unsplash.com/photo-1525097487452-6278ff080c31',
    title: 'Books',
    author: 'Pavel Nekoranec',
  },
  {
    img: 'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6',
    title: 'Sink',
    author: 'Charles Deluvio',
  },
  {
    img: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3',
    title: 'Kitchen',
    author: 'Christian Mackie',
  },
  {
    img: 'https://images.unsplash.com/photo-1588436706487-9d55d73a39e3',
    title: 'Blinds',
    author: 'Darren Richardson',
  },
  {
    img: 'https://images.unsplash.com/photo-1574180045827-681f8a1a9622',
    title: 'Chairs',
    author: 'Taylor Simpson',
  },
];

export default BeaverAvata;