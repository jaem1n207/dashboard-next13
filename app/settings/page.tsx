import type { Metadata } from 'next';
import React from 'react';
import { Card, Text, Title } from '@tremor/react';

import PartnersTable, { Partner } from './partners-table';
import Search from './search';

export const metadata: Metadata = {
  title: '설정',
  description: '설정',
};

const Settings = ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { q: string };
}) => {
  const partners: Partner[] = [
    {
      id: '1',
      name: 'Next',
      email: 'next@abc.com',
      phone: '010-1234-5678',
    },
    {
      id: '2',
      name: 'Remix',
      email: 'remix@abc.com',
      phone: '010-1234-5679',
    },
    {
      id: '3',
      name: 'Docusaurus',
      email: 'docusaurus@abc.com',
      phone: '010-1234-5680',
    },
    {
      id: '4',
      name: 'Turbopack',
      email: 'turbopack@abc.com',
      phone: '010-1234-5681',
    },
    {
      id: '5',
      name: 'Trpc',
      email: 'trpc@abc.com',
      phone: '010-1234-5682',
    },
  ];

  return (
    <main className="w-full p-4 mx-auto overflow-auto md:p-10 max-w-7xl">
      <Title>파트너</Title>
      <Text>가구사와의 파트너십을 원하시면 아키스케치로 문의 바랍니다.</Text>
      <Search />
      <Card className="mt-6">
        <PartnersTable partners={partners} searchValue={searchParams.q} />
      </Card>
    </main>
  );
};

export default Settings;
