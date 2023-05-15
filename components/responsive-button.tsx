'use client';

import React, { useMemo } from 'react';
import { Button } from 'antd';
import type { ButtonProps } from 'antd/es/button/button';
import { type ScreenSize as ScreenSizeType, useScreenSize } from '@/hooks/use-screen-size';

type ResponsiveButtonProps = Omit<ButtonProps, 'size'>;

const ResponsiveButton = (props: ResponsiveButtonProps) => {
  const { children } = props;

  const screensize = useScreenSize();

  const size = useMemo((): ButtonProps['size'] => {
    const smallSizes: ScreenSizeType[] = ['xs', 'sm'];
    const middleSizes: ScreenSizeType[] = ['md', 'lg', 'xl'];
    const largeSizes: ScreenSizeType[] = ['xxl'];

    if (smallSizes.includes(screensize)) {
      return 'small';
    } else if (middleSizes.includes(screensize)) {
      return 'middle';
    } else if (largeSizes.includes(screensize)) {
      return 'large';
    }
  }, [screensize]);

  return (
    <Button {...props} size={size}>
      {children}
    </Button>
  );
};

export default ResponsiveButton;
