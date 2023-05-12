'use client';

import { Layout } from 'antd';
import React, { PropsWithChildren } from 'react';

const { Content } = Layout;

const ProjectLayout = ({ children }: PropsWithChildren) => {
  return <Content className="p-2 sm:p-6">{children}</Content>;
};

export default ProjectLayout;
