'use client';

import { Card, AreaChart, Title, Text } from '@tremor/react';

const data = [
  {
    월: '01.21',
    매출: 2890,
    이익: 2400,
  },
  {
    월: '02.21',
    매출: 1890,
    이익: 1398,
  },
  {
    월: '03.21',
    매출: 3890,
    이익: 2980,
  },
];

const valueFormatter = (number: number) =>
  `₩ ${Intl.NumberFormat('ko-KR').format(number).toString()}`;

const Chart = () => {
  return (
    <Card className="mt-8">
      <Title>수익</Title>
      <Text>매출과 이익 비교</Text>
      <AreaChart
        className="mt-4 h-80"
        data={data}
        categories={['매출', '이익']}
        index="월"
        colors={['indigo', 'fuchsia']}
        valueFormatter={valueFormatter}
      />
    </Card>
  );
};

export default Chart;
