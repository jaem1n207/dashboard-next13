'use client';

import { ArrowRightOutlined, GlobalOutlined, NotificationOutlined } from '@ant-design/icons';
import { theme, Layout, Space, Button, Tooltip, Dropdown, message } from 'antd';
import type { MenuProps } from 'antd/lib/menu';

const { Header: AntdHeader } = Layout;

const items: MenuProps['items'] = [
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

const Header = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [messageApi, contextHolder] = message.useMessage();

  const handleClearAllNotifications = () => {
    messageApi.open({
      type: 'success',
      content: '모든 알림을 확인했습니다.',
    });
  };

  return (
    <>
      {contextHolder}
      <AntdHeader className={`shadow-md p-0 bg-[${colorBgContainer}]`}>
        <div className="relative flex items-center h-full px-4">
          <div className="flex-1" />
          <Space className="flex float-right h-full gap-2 ml-auto overflow-auto">
            <Button>
              Styler 바로가기 <ArrowRightOutlined />
            </Button>
            <Dropdown
              menu={{ items, selectable: true, defaultSelectedKeys: ['ko'] }}
              trigger={['click']}>
              <Button icon={<GlobalOutlined />} type="default">
                언어 변경
              </Button>
            </Dropdown>
            <Tooltip title="알림">
              <Button icon={<NotificationOutlined />} onClick={handleClearAllNotifications} />
            </Tooltip>
          </Space>
        </div>
      </AntdHeader>
    </>
  );
};

export default Header;
