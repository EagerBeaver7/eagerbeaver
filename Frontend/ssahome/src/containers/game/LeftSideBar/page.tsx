import React from 'react';
import styles from './page.module.css'

import News from './News/page';
import Items from './Items/page';

const LeftSideBar = () => {
  return (
    <div className={styles.LeftSideBar}>
      <div>
        <News/>
      </div>
      <div>
        <Items/>
      </div>
    </div>
  );
};

export default LeftSideBar;
