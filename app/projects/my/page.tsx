import type { Metadata } from 'next';
import React from 'react';

import Content from './content';

export const metadata: Metadata = {
  title: '내 프로젝트',
  description: '내 프로젝트',
};

const MyProject = () => {
  return <Content />;
};

export default MyProject;
