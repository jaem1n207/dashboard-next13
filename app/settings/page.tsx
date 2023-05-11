import type { Metadata } from 'next';
import React from 'react';
import Content from './content';

export const metadata: Metadata = {
  title: '설정',
  description: '설정',
};

const Settings = () => {
  return <Content />;
};

export default Settings;
