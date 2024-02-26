'use client';

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

// Error page must be a client component
const ErrorPage = ({ error }: ErrorPageProps) => {
  return <div>{error.message}</div>;
};

export default ErrorPage;
