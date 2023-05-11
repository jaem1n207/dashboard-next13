'use client';

import { Breadcrumb, theme, Layout } from 'antd';
import React from 'react';

const { Content: AntdContent } = Layout;

const Content = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <AntdContent className="mx-4">
      <Breadcrumb
        className="mt-4"
        items={[
          {
            key: 'user',
            title: 'User',
          },
          {
            key: 'bill',
            title: 'Bill',
          },
        ]}></Breadcrumb>
      <div className={`p-6 min-h-[360px] bg-${colorBgContainer}`}>Bill is a cat.</div>
    </AntdContent>
  );
};

export default Content;
