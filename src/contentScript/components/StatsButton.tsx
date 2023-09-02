import React from 'react'

interface ButtonProps {
  buttonTextContent: string
  toggleModal: () => void
  classNames: string
}

export default function StatsButton({ buttonTextContent, toggleModal, classNames }: ButtonProps) {
  return (
    <>
      <button
        onClick={toggleModal}
        className={`rounded-full bg-blue-500 font-bold text-white hover:bg-blue-700 ${classNames}`}
      >
        {buttonTextContent}
      </button>
    </>
  )
}
