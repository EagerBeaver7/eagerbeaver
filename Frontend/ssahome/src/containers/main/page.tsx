'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const MainPage = () => {
  return (
    <Suspense>
      메인 페이지
    </Suspense>
  );
};

export default MainPage;