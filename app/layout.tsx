import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';

import { Layout } from '@/lib/antd';
import './globals.css';
import Header from './header';
import Sider from './sider';
import Footer from './footer';
import AntdStyleRegistry from '@/lib/antd-registry';
import StyledComponentRegistry from '@/lib/styled-registry';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: '대시보드',
  description: 'Next13 사용하여 대시보드 만들기',
  viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={inter.className}>
        <AntdStyleRegistry>
          <StyledComponentRegistry>
            <Layout className="flex h-screen min-h-screen">
              <Sider />
              <Layout className="flex flex-1 overflow-hidden bg-white site-layout">
                <Header />
                {children}
                <Footer />
              </Layout>
            </Layout>
          </StyledComponentRegistry>
        </AntdStyleRegistry>
        <Analytics />
      </body>
    </html>
  );
}
