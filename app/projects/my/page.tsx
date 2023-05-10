import ErrorBoundary from '@/components/error-boundary';
import Example from '@/components/example';
import React from 'react';

const MyProject = () => {
  return (
    <ErrorBoundary>
      <Example />
    </ErrorBoundary>
  );
};

export default MyProject;
