'use client';

import { Title } from '@tremor/react';

import ResponsiveButton from '@/components/responsive-button';

const GlobalError = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <html>
      <body>
        <Title>문제가 발생했어요.</Title>
        <ResponsiveButton type="primary" onClick={() => reset()}>
          다시 시도할게요.
        </ResponsiveButton>
      </body>
    </html>
  );
};

export default GlobalError;
