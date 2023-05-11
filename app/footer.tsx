'use client';

import { Layout } from 'antd';
import React from 'react';

const { Footer: AntdFooter } = Layout;

const Footer = () => {
  return (
    <AntdFooter className="text-center">
      Archisketch Test Dashboard @{new Date().getFullYear()} Created by Ben
    </AntdFooter>
  );
};

export default Footer;
