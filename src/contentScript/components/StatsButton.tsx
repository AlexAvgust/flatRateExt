import React from 'react'

interface ButtonProps {
  buttonTextContent: string
  toggleModal: () => void
}

export default function StatsButton({ buttonTextContent, toggleModal }: ButtonProps) {
  return (
    <>
      <button
        onClick={() => toggleModal}
        className="rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        {buttonTextContent}
      </button>
    </>
  )
}
