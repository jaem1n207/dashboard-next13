import { Card, Flex, Metric, ProgressBar, Text } from '@/lib/tremor';
import React from 'react';

const Example = () => {
  return (
    <div>
      <Card className="max-w-xs mx-auto">
        <Text>Sales</Text>
        <Metric>$ 34,743</Metric>
        <Flex className="mt-4">
          <Text>32% of annual target</Text>
          <Text>$ 225,000</Text>
        </Flex>
        <ProgressBar percentageValue={32} className="mt-2" />
      </Card>
    </div>
  );
};

export default Example;
