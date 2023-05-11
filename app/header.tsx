'use client';

import { theme, Layout } from 'antd';

const { Header: AntdHeader } = Layout;

const Header = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return <AntdHeader className={`p-0 bg-[${colorBgContainer}]`} />;
};

export default Header;
