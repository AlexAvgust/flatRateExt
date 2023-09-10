import React, { useEffect } from 'react'

interface ColorUpdaterProps {
  onlyExistingTickets: number[]
}

function updateColors(container: HTMLElement, arrayOfIds: number[]): void {
  const rows: NodeListOf<HTMLElement> = container.querySelectorAll('[data-id]')

  rows.forEach((row: HTMLElement) => {
    const attributeId = Number(row.getAttribute('data-id'))
    if (arrayOfIds.includes(attributeId)) {
      row.style.backgroundColor = 'yellow'
    }
  })
}

export default function ColorUpdater({ onlyExistingTickets }: ColorUpdaterProps) {
  useEffect(() => {
    const mutationCallback: MutationCallback = function (
      mutationsList: MutationRecord[],
      observer
    ) {
      for (const mutation of mutationsList) {
        //  runs of any mutation of tickets list
        updateColors(ticketsTable, onlyExistingTickets)
      }
    }

    const observer: MutationObserver = new MutationObserver(mutationCallback)

    const ticketsTable: HTMLElement = document.getElementById('content-area') as HTMLElement

    observer.observe(ticketsTable, { attributes: true, childList: true, subtree: true })
    // runs on init
    updateColors(ticketsTable, onlyExistingTickets)

    return () => {
      if (observer) {
        observer.disconnect()
      }
    }
  }, [onlyExistingTickets])

  return <></>
}
