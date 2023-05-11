'use client';

import { Menu } from 'antd';
import {
  CodeSandboxOutlined,
  DropboxOutlined,
  SettingOutlined,
  TrophyOutlined,
} from '@ant-design/icons';
import Sider from 'antd/es/layout/Sider';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Header = () => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
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
    </Sider>
  );
};

export default Header;
