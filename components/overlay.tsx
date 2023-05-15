import React, { ReactNode } from 'react';

interface OverlayProps {
  className?: string;
  isVisible: boolean;
  children: ReactNode;
  topLeft?: ReactNode;
  topRight?: ReactNode;
  bottomLeft?: ReactNode;
  bottomRight?: ReactNode;
}

const Overlay = ({
  className,
  isVisible,
  children,
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
}: OverlayProps) => {
  return (
    <div
      className={`absolute inset-0 bg-black bg-opacity-50 ${
        isVisible ? 'block' : 'hidden'
      } ${className}`}>
      {topLeft && <div className="absolute top-0 left-0 p-2">{topLeft}</div>}
      {topRight && <div className="absolute top-0 right-0 p-2">{topRight}</div>}
      {bottomLeft && <div className="absolute bottom-0 left-0 p-2">{bottomLeft}</div>}
      {bottomRight && <div className="absolute bottom-0 right-0 p-2">{bottomRight}</div>}
      <div className="flex items-center justify-center h-full">{children}</div>
    </div>
  );
};

export default Overlay;
