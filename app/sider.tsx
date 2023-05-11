'use client';

import { Menu } from 'antd';
import {
  CodeSandboxOutlined,
  DropboxOutlined,
  SettingOutlined,
  TrophyOutlined,
} from '@ant-design/icons';
import AntdSider from 'antd/es/layout/Sider';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Sider = () => {
  const router = useRouter();

  const [collapsed, setCollapsed] = useState(false);

  return (
    <AntdSider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
      <div className="h-8 m-4 text-2xl text-center text-white truncate">Archisketch</div>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="inline"
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
