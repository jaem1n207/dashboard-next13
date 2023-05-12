'use client';

import React, { useMemo } from 'react';
import { Button } from 'antd';
import type { ButtonProps } from 'antd/es/button/button';
import { type ScreenSize as ScreenSizeType, useScreenSize } from '@/hooks/use-screen-size';
import { styled } from 'styled-components';

type ResponsiveButtonProps = Omit<ButtonProps, 'size'>;

const StyledButton = styled(Button)<{ screensize: ButtonProps['size'] }>`
  // 여기에서 버튼에 대한 커스텀 스타일 추가 가능.
`;

const ResponsiveButton = (props: ResponsiveButtonProps) => {
  const { children } = props;

  const screensize = useScreenSize();

  const size = useMemo((): ButtonProps['size'] => {
    const smallSizes: ScreenSizeType[] = ['xs', 'sm'];
    const middleSizes: ScreenSizeType[] = ['md', 'lg'];
    const largeSizes: ScreenSizeType[] = ['xl', 'xxl'];

    if (smallSizes.includes(screensize)) {
      return 'small';
    } else if (middleSizes.includes(screensize)) {
      return 'middle';
    } else if (largeSizes.includes(screensize)) {
      return 'large';
    }
  }, [screensize]);

  return (
    <StyledButton {...props} screensize={size} size={size}>
      {children}
    </StyledButton>
  );
};

export default ResponsiveButton;
