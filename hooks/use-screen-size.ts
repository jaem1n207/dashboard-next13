import { useEffect, useState } from 'react';

export type ScreenSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

const debounce = <T extends (...args: any[]) => any>(func: T, wait: number): T => {
  let timeout: ReturnType<typeof setTimeout> | null;

  const debounced = (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };

  return debounced as unknown as T;
};

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
  if (typeof window === 'undefined') return DEFAULT_SCREEN_SIZE; // SSR에서의 기본값

  const currentWidth = window.innerWidth;
  const currentScreenSize = screenSizes.find(screen => currentWidth >= screen.minWidth);

  return currentScreenSize ? currentScreenSize.size : DEFAULT_SCREEN_SIZE;
};

/**
 * @warn
 *
 * React는 DOM 요소에서 대문자가 포함된 `screenSize`를 인식하지 못합니다. 따라서 커스텀 속성을 표시하려면 `screensize`와 같이 소문자로 작성해야합니다.
 *
 * @example
 * ```tsx
 * const StyledButton = styled(Button)<{ screensize: ButtonProps['size'] }>`...`;
 *
 * const screenSize = useScreenSize();
 *
 * return (
 *   <StyledButton {...props} screensize={size}>
 *     ...
 *   </StyledButton>
 * );
 * ```
 */
export const useScreenSize = (): ScreenSize => {
  const [screenSize, setScreenSize] = useState<ScreenSize>(getScreenSize);

  useEffect(() => {
    const updateScreenSize = () => {
      setScreenSize(getScreenSize());
    };

    const debouncedUpdateScreenSize = debounce(updateScreenSize, 150);

    window.addEventListener('resize', debouncedUpdateScreenSize);
    return () => window.removeEventListener('resize', debouncedUpdateScreenSize);
  }, []);

  return screenSize;
};
