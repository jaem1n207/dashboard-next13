import { useEffect, useState } from 'react';

type ScreenSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

const screenSizes: { minWidth: number; size: ScreenSize }[] = [
  { minWidth: 1600, size: 'xxl' },
  { minWidth: 1200, size: 'xl' },
  { minWidth: 992, size: 'lg' },
  { minWidth: 768, size: 'md' },
  { minWidth: 576, size: 'sm' },
  { minWidth: 0, size: 'xs' },
];

const DEFAULT_SCREEN_SIZE: ScreenSize = 'md';

const getScreenSize = (): ScreenSize => {
  if (typeof window === 'undefined') return DEFAULT_SCREEN_SIZE; // default value for SSR

  const currentWidth = window.innerWidth;
  const currentScreenSize = screenSizes.find(screen => currentWidth >= screen.minWidth);

  return currentScreenSize ? currentScreenSize.size : DEFAULT_SCREEN_SIZE;
};

export const useScreenSize = (): ScreenSize => {
  const [screenSize, setScreenSize] = useState<ScreenSize>(getScreenSize);

  useEffect(() => {
    const updateScreenSize = () => {
      setScreenSize(getScreenSize());
    };

    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  return screenSize;
};
