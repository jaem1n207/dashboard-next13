'use client';

import { Title } from '@tremor/react';
import { Button } from 'antd';
import React, { useEffect } from 'react';

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <Title>문제가 발생했어요.</Title>
      <Button onClick={() => reset()}>다시 시도할게요.</Button>
    </div>
  );
};

export default Error;
