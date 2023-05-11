'use client';

import { Text } from '@tremor/react';
import { Layout } from 'antd';
import React from 'react';

const { Footer: AntdFooter } = Layout;

const Footer = () => {
  return (
    <AntdFooter className="text-center">
      <Text className="m-0 truncate">
        Archisketch Test Dashboard @{new Date().getFullYear()} Created by Ben
      </Text>
    </AntdFooter>
  );
};

export default Footer;
