import { ImageList, ImageListItem, Typography } from '@mui/material';
import Image from 'next/image';
import * as React from 'react';
import styles from './page.module.css';

const RankList = () => {
    return (
        <main className={styles.rank}>
            <Typography> 위</Typography>
            <Image
                src={`https://images.unsplash.com/photo-1549388604-817d15aa0110`}
                alt='bed'
                className={styles.profile}
                width={300}
                height={150}
                loading="lazy"
            />
        </main>
    );
};

export default RankList;

