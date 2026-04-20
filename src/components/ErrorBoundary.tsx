import { useRouteError, isRouteErrorResponse } from 'react-router-dom'
import { Button } from '@heroui/react'

export default function ErrorBoundary() {
  const error = useRouteError()

  const is404 = isRouteErrorResponse(error) && error.status === 404

  const title = is404 ? 'Page not found' : 'Something went wrong'
  const message = isRouteErrorResponse(error)
    ? error.statusText
    : error instanceof Error
      ? error.message
      : 'An unexpected error occurred.'

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-primary-100 to-secondary-100 p-8 text-center">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(14,165,233,0.15),transparent_60%)]" />
      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            {is404 ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
            )}
          </svg>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="font-serif text-4xl font-bold text-default-900 md:text-5xl">
            {title}
          </h1>
          <p className="max-w-md text-default-600">{message}</p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            as="a"
            href="/"
            color="primary"
            size="lg"
            className="font-medium"
          >
            Go home
          </Button>
          <Button
            size="lg"
            variant="light"
            className="font-medium"
            onPress={() => window.history.back()}
          >
            Go back
          </Button>
        </div>
      </div>
    </div>
  )
}
