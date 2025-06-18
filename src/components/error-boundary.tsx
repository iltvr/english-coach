import React from 'react';
import { Button } from '@heroui/react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error("Application error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="max-w-md w-full text-center">
            <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
            <p className="mb-6 text-default-600">
              We're sorry, but there was an error loading this page.
            </p>
            <div className="mb-4 p-4 bg-danger-50 text-danger rounded-md text-left overflow-auto max-h-32">
              <pre className="text-sm">{this.state.error?.toString()}</pre>
            </div>
            <Button 
              color="primary"
              onPress={() => {
                this.setState({ hasError: false, error: null });
                window.location.href = '/';
              }}
            >
              Reload Application
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}