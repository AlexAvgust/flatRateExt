import axios from 'axios'
import React, { useEffect, useState } from 'react'

function updateColors(container: HTMLElement, arrayOfIds: number[]) {
  const rows = container.querySelectorAll('[data-id]') as NodeListOf<HTMLElement>

  rows.forEach((row: HTMLElement) => {
    const attributeId = Number(row.getAttribute('data-id'))
    if (arrayOfIds.includes(attributeId)) {
      row.style.backgroundColor = 'yellow'
    }
  })
}

export default function ColorUpdater() {
  const [onlyExistingTickets, setOnlyExistingTickets] = useState<number[]>([])

  useEffect(() => {
    axios
      .get('http://localhost:3000/TicketGroups')
      .then(response => {
        const filteredTickets = response.data
          .filter((el: { ExchangeTicketGroupID: number }) => el.ExchangeTicketGroupID !== -1)
          .map((el: { ExchangeTicketGroupID: number }) => el.ExchangeTicketGroupID)
        setOnlyExistingTickets(filteredTickets)
      })
      .catch(error => {
        console.log(error)
        setOnlyExistingTickets([])
      })
  }, [])

  useEffect(() => {
    let observer: MutationObserver

    const ticketsTable = document.getElementById('content-area') as HTMLElement

    // eslint-disable-next-line no-undef
    const mutationCallback: MutationCallback = function (mutationsList, observer) {
      for (const mutation of mutationsList) {
        updateColors(ticketsTable, onlyExistingTickets)
      }
    }
    observer = new MutationObserver(mutationCallback)

    observer.observe(ticketsTable, { attributes: true, childList: true, subtree: true })

    updateColors(ticketsTable, onlyExistingTickets)

    return () => {
      if (observer) {
        observer.disconnect()
      }
    }
  }, [onlyExistingTickets])

  return <></>
}
