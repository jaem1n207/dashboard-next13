import type { Metadata } from 'next';
import React from 'react';
import Content from './content';

export const metadata: Metadata = {
  title: '데이터 분석',
  description: '데이터 분석',
};

const Analysis = () => {
  return <Content />;
};

export default Analysis;
