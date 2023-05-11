import { Inter } from 'next/font/google';

import { Layout } from '@/lib/antd';
import { RootStyleRegistry } from './antd';
import './globals.css';
import Header from './header';
import Sider from './sider';
import Footer from './footer';

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
        <RootStyleRegistry>
          <Layout className="min-h-screen">
            <Sider />
            <Layout className="bg-white site-layout">
              <Header />
              {children}
              <Footer />
            </Layout>
          </Layout>
        </RootStyleRegistry>
      </body>
    </html>
  );
}
