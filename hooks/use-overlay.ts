import { useState, useEffect } from 'react';
import { useDeviceDetect } from './use-device-detect';

import Overlay from '@/components/overlay';

/**
 * {@link Overlay} 컴포넌트의 가시성 및 클래스를 관리합니다.
 */
export const useOverlay = () => {
  const { isMobile } = useDeviceDetect();
  const [overlayVisible, setOverlayVisible] = useState(false);

  const toggleOverlay = () => {
    if (isMobile) {
      setOverlayVisible(!overlayVisible);
    }
  };

  const overlayClasses = isMobile ? '' : 'group-hover:block cursor-pointer';

  useEffect(() => {
    if (!isMobile) {
      setOverlayVisible(false);
    }
  }, [isMobile]);

  return { overlayVisible, toggleOverlay, overlayClasses };
};
