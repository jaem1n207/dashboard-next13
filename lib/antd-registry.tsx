'use client';

import { useState, type PropsWithChildren } from 'react';
import { ConfigProvider } from 'antd';
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';
import { useServerInsertedHTML } from 'next/navigation';

const AntdStyleRegistry = ({ children }: PropsWithChildren) => {
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
    // <ConfigProvider
    //   theme={{
    //     token: {
    //       colorPrimary: 'rgb(74, 144, 226)',
    //       colorBgContainer: '#fff',
    //     },
    //   }}>
    <StyleProvider hashPriority="high" cache={cache}>
      {children}
    </StyleProvider>
    // </ConfigProvider>
  );
};

export default AntdStyleRegistry;
