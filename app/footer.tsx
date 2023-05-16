'use client';

import { Text } from '@tremor/react';
import { Layout } from 'antd';
import React from 'react';

const { Footer: AntdFooter } = Layout;

const Footer = () => {
  return (
    <AntdFooter className="text-center">
      <Text className="m-0 truncate">
        Dashboards that support all devices @{new Date().getFullYear()}
      </Text>
    </AntdFooter>
  );
};

export default Footer;
