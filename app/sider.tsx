'use client';

import { Menu, theme } from 'antd';
import { DropboxOutlined, SettingOutlined, TrophyOutlined } from '@ant-design/icons';
import AntdSider from 'antd/es/layout/Sider';
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { type ScreenSize, useScreenSize } from '@/hooks/use-screen-size';

const DEFAULT_SELECTED_KEYS = ['my-project'];

const Sider = () => {
  const router = useRouter();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [collapsed, setCollapsed] = useState(false);

  const [collapsedWidth, setCollapsedWidth] = useState(0);
  const screenSize = useScreenSize();

  useEffect(() => {
    const hideCollapsedSizes: ScreenSize[] = ['xs', 'sm'];
    const defaultCollapsedSizes: ScreenSize[] = hideCollapsedSizes.concat(['md']);

    hideCollapsedSizes.includes(screenSize) ? setCollapsedWidth(0) : setCollapsedWidth(80);
    defaultCollapsedSizes.includes(screenSize) ? setCollapsed(true) : setCollapsed(false);
  }, [screenSize]);

  const pathname = usePathname();
  const [selectedKey, setSelectedKey] = useState(DEFAULT_SELECTED_KEYS);

  useEffect(() => {
    if (pathname.includes('my')) {
      setSelectedKey(['my-project']);
    } else if (pathname.includes('analysis')) {
      setSelectedKey(['analysis']);
    } else if (pathname.includes('settings')) {
      setSelectedKey(['settings']);
    }
  }, [pathname]);

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
      className={`bg-${colorBgContainer} h-[calc(100vh-32px)]`}>
      <div className="h-8 m-4 text-2xl text-center text-black truncate">Archisketch</div>
      <div className="logo" />
      <Menu
        mode="inline"
        className="h-full"
        selectedKeys={selectedKey}
        defaultSelectedKeys={DEFAULT_SELECTED_KEYS}
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
