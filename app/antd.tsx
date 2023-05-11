'use client';

import { useState, type PropsWithChildren } from 'react';
import { ConfigProvider } from 'antd';
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';
import { useServerInsertedHTML } from 'next/navigation';
import 'antd/dist/reset.css';

export const RootStyleRegistry = ({ children }: PropsWithChildren) => {
  const [cache] = useState(() => createCache());

  useServerInsertedHTML(() => {
    return (
      <script
        dangerouslySetInnerHTML={{
          __html: `</script>${extractStyle(cache)}<script>`,
        }}
      />
    );
  });

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: 'rgb(74, 144, 226)',
        },
      }}>
      <StyleProvider hashPriority="high" cache={cache}>
        {children}
      </StyleProvider>
    </ConfigProvider>
  );
};
