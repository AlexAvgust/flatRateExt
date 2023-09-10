import React, { useEffect } from 'react'

interface ErrorProps {
  errorText: string | undefined
  setShowErrorMessage: (showErrorMessage: boolean) => void
}

const Error = ({ errorText, setShowErrorMessage }: ErrorProps) => {
  useEffect(() => {
    const overall = document.querySelector('.overall')
    if (overall) {
      overall.remove()
    }
    setTimeout(() => {
      setShowErrorMessage(false)
    }, 15000)
  }, [])

  return (
    <div
      style={{ transform: 'translate(-50%, 20%)' }}
      className=" fixed left-1/2 top-0 z-10 flex  items-center rounded-lg bg-red-50 p-4 text-red-800 dark:bg-gray-800 dark:text-red-400"
      role="alert"
    >
      <svg
        className="h-4 w-4 shrink-0"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <span className="sr-only">Info</span>
      <div className="ml-3 text-sm font-medium">{errorText}</div>
      <button
        onClick={() => setShowErrorMessage(false)}
        type="button"
        className="-m-1.5 ml-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 p-1.5 text-red-500 hover:bg-red-200 focus:ring-2 focus:ring-red-400 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"
        data-dismiss-target="#alert-2"
        aria-label="Close"
      >
        <span className="sr-only">Close</span>
        <svg
          className="h-3 w-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </div>
  )
}
export default Error
