import type { Metadata } from 'next';
import React from 'react';
import Content from './content';

export const metadata: Metadata = {
  title: '기업 라이브러리',
  description: '기업 라이브러리',
};

const EnterpriseLibrary = () => {
  return <Content />;
};

export default EnterpriseLibrary;
