'use client';

import { Button, Flex } from '@tremor/react';
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI

    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    // You can use your own error logging service here
    console.log({ error, errorInfo });
  }
  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Flex
          flexDirection="col"
          alignItems="center"
          justifyContent="center"
          className="h-screen gap-2">
          <h2>오류가 발생했어요!</h2>
          <Button type="button" onClick={() => this.setState({ hasError: false })}>
            다시 시도할래요.
          </Button>
        </Flex>
      );
    }

    // Return children components in case of no error

    return this.props.children;
  }
}

export default ErrorBoundary;
