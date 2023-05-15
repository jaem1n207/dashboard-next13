'use client';

import { Layout } from 'antd';
import React, { PropsWithChildren } from 'react';

const { Content } = Layout;

const ProjectLayout = ({ children }: PropsWithChildren) => {
  return (
    <Content className="flex flex-col p-2 overflow-hidden overflow-x-hidden overflow-y-auto felx-1 sm:p-6">
      {children}
    </Content>
  );
};

export default ProjectLayout;
