'use client';

import { Menu, theme } from 'antd';
import {
  CodeSandboxOutlined,
  DropboxOutlined,
  SettingOutlined,
  TrophyOutlined,
} from '@ant-design/icons';
import AntdSider from 'antd/es/layout/Sider';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { type ScreenSize, useScreenSize } from '@/hooks/use-screen-size';

const Sider = () => {
  const router = useRouter();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [collapsed, setCollapsed] = React.useState(false);

  const [collapsedWidth, setCollapsedWidth] = React.useState(0);
  const screenSize = useScreenSize();

  useEffect(() => {
    const hideCollapsedSizes: ScreenSize[] = ['xs', 'sm'];
    const defaultCollapsedSizes: ScreenSize[] = hideCollapsedSizes.concat(['md']);

    hideCollapsedSizes.includes(screenSize) ? setCollapsedWidth(0) : setCollapsedWidth(80);
    defaultCollapsedSizes.includes(screenSize) ? setCollapsed(true) : setCollapsed(false);
  }, [screenSize]);

  return (
    <AntdSider
      breakpoint="md"
      collapsedWidth={collapsedWidth}
      collapsible
      collapsed={collapsed}
      onCollapse={collapsed => {
        setCollapsed(collapsed);
      }}
      theme="light"
      className={`bg-${colorBgContainer}`}>
      <div className="h-8 m-4 text-2xl text-center text-black truncate">Archisketch</div>
      <div className="logo" />
      <Menu
        mode="inline"
        className="h-full"
        defaultSelectedKeys={['my-project']}
        items={[
          {
            key: 'my-project',
            icon: <DropboxOutlined />,
            label: '내 프로젝트',
            onClick: () => {
              router.push('projects/my');
            },
          },
          {
            key: 'enterprise-library',
            icon: <CodeSandboxOutlined />,
            label: '기업 라이브러리',
            onClick: () => {
              router.push('/enterprise-library');
            },
          },
          {
            key: 'analysis',
            icon: <TrophyOutlined />,
            label: '데이터 분석',
            onClick: () => {
              router.push('/analysis');
            },
          },
          {
            key: 'settings',
            icon: <SettingOutlined />,
            label: '설정',
            onClick: () => {
              router.push('/settings');
            },
          },
        ]}
      />
    </AntdSider>
  );
};

export default Sider;
