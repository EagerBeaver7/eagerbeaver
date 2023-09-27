import React from 'react';
import styles from './page.module.css'

import Content from './Content/page';

const News = () => {
  return (
    <div className={styles.News}>
      <div className={styles.wrap}>
        <div className={styles.content}>
          <Content />
        </div>
      </div>
    </div>
    
  );
};

export default News;
