import React, { PropsWithChildren } from 'react';
import ProjectLayout from '../project-layout';

const MyProjectLayout = ({ children }: PropsWithChildren) => {
  return <ProjectLayout>{children}</ProjectLayout>;
};

export default MyProjectLayout;
