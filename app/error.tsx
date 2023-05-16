'use client';

import { Title } from '@tremor/react';

import { Button } from 'antd';

const GlobalError = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <html>
      <body>
        <Title>문제가 발생했어요.</Title>
        <Button type="primary" onClick={() => reset()}>
          다시 시도할게요.
        </Button>
      </body>
    </html>
  );
};

export default GlobalError;
