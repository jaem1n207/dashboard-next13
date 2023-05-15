'use client';

import { Layout } from 'antd';
import React from 'react';
import { Card, Metric, Text, Flex, Grid, Title, BarList } from '@tremor/react';
import Chart from './chart';

const partnersRendershots = [
  { name: 'D', value: 1230 },
  { name: 'C', value: 751 },
  { name: 'A', value: 471 },
  { name: 'E', value: 280 },
  { name: 'B', value: 78 },
];

const partnersProjects = [
  { name: 'B', value: 453 },
  { name: 'C', value: 351 },
  { name: 'D', value: 271 },
  { name: 'A', value: 191 },
  { name: 'E', value: 1 },
];

const partnersAPI = [
  { name: 'C', value: 789 },
  { name: 'B', value: 676 },
  { name: 'D', value: 564 },
  { name: 'A', value: 234 },
  { name: 'E', value: 191 },
];

const data = [
  {
    category: '파트너사별 생성된 렌더샷',
    stat: '10,234',
    data: partnersRendershots,
  },
  {
    category: '파트너사별 생성된 프로젝트',
    stat: '12,543',
    data: partnersProjects,
  },
  {
    category: '파트너사별 API 호출량',
    stat: '2,543',
    data: partnersAPI,
  },
];

const dataFormatter = (number: number) => Intl.NumberFormat('ko-KR').format(number).toString();

const categories: {
  title: string;
  metric: string;
  metricPrev: string;
}[] = [
  {
    title: '생성된 렌더샷',
    metric: '12,699',
    metricPrev: '9,456',
  },
  {
    title: '렌더 비용',
    metric: '₩ 40,598',
    metricPrev: '₩ 45,564',
  },
  {
    title: '파트너사',
    metric: '1,072',
    metricPrev: '856',
  },
];

const Content = () => {
  return (
    <main className="w-full h-full p-4 mx-auto overflow-auto md:p-10">
      <Chart />
      <Grid className="gap-6 mt-8" numColsSm={2} numColsLg={3}>
        {categories.map(item => (
          <Card key={item.title}>
            <Flex alignItems="start">
              <Text>{item.title}</Text>
            </Flex>
            <Flex className="space-x-3 truncate" justifyContent="start" alignItems="baseline">
              <Metric>{item.metric}</Metric>
              <Text className="truncate">from {item.metricPrev}(2022)</Text>
            </Flex>
          </Card>
        ))}
      </Grid>
      <Grid className="gap-6 mt-8" numColsSm={2} numColsLg={3}>
        {data.map(item => (
          <Card key={item.category}>
            <Title>{item.category}</Title>
            <Flex className="space-x-2" justifyContent="start" alignItems="baseline">
              <Metric>{item.stat}</Metric>
              <Text>Total</Text>
            </Flex>
            <Flex className="mt-6">
              <Text>Partner</Text>
              <Text className="text-right">Count</Text>
            </Flex>
            <BarList className="mt-2" data={item.data} valueFormatter={dataFormatter} />
          </Card>
        ))}
      </Grid>
    </main>
  );
};

export default Content;
