'use client';

import {
  ArrowRightOutlined,
  EditOutlined,
  GlobalOutlined,
  LogoutOutlined,
  NotificationOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { theme, Layout, Space, Tooltip, Dropdown, message, Divider } from 'antd';
import type { MenuProps } from 'antd/lib/menu';

import ResponsiveButton from '@/components/responsive-button';

const { Header: AntdHeader } = Layout;

const languagesItems: MenuProps['items'] = [
  {
    key: 'ko',
    label: '한국어',
    icon: '🇰🇷',
  },
  {
    key: 'en',
    label: 'English',
    icon: '🇺🇸',
  },
  {
    key: 'ja',
    label: '日本語',
    icon: '🇯🇵',
  },
  {
    key: 'vn',
    label: 'Tiếng Việt',
    icon: '🇻🇳',
  },
];

const userItems: MenuProps['items'] = [
  {
    key: 'profile',
    label: '프로필',
    icon: <UserOutlined />,
  },
  {
    key: 'settings',
    label: '설정',
    icon: <EditOutlined />,
  },
  {
    key: 'logout',
    label: '로그아웃',
    icon: <LogoutOutlined />,
  },
];

const Header = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [messageApi, contextHolder] = message.useMessage();

  const handleClearAllNotifications = () => {
    messageApi.open({
      type: 'success',
      content: '모든 알림을 확인했습니다.',
      onClick: () => {
        messageApi.destroy();
      },
      duration: 1.5,
    });
  };

  return (
    <>
      {contextHolder}
      <AntdHeader className={`shadow-md p-0 bg-[${colorBgContainer}]`}>
        <div className="relative flex items-center h-full px-4">
          <div className="flex-1" />
          <Space className="flex float-right h-full gap-2 ml-auto overflow-auto">
            <ResponsiveButton>
              Styler 바로가기 <ArrowRightOutlined />
            </ResponsiveButton>
            <Dropdown
              menu={{ items: languagesItems, selectable: true, defaultSelectedKeys: ['ko'] }}
              trigger={['click']}>
              <ResponsiveButton icon={<GlobalOutlined />} type="default">
                언어 변경
              </ResponsiveButton>
            </Dropdown>
            <Tooltip title="알림">
              <ResponsiveButton
                icon={<NotificationOutlined />}
                onClick={handleClearAllNotifications}
              />
            </Tooltip>
            <Divider type="vertical" />
            <Dropdown
              menu={{ items: userItems, selectable: true, defaultSelectedKeys: ['profile'] }}
              trigger={['click']}>
              <ResponsiveButton icon={<UserOutlined />} type="primary">
                Ben
              </ResponsiveButton>
            </Dropdown>
          </Space>
        </div>
      </AntdHeader>
    </>
  );
};

export default Header;
