import axios, { AxiosResponse } from 'axios'
import React, { useEffect, useState } from 'react'

import EventStats from './components/EventStats'
import Overall from './components/Overall'
import StatsButton from './components/StatsButton'
import useModal from './hooks/useModal'
import { Event, TicketGroup, TicketGroupsData } from './interfaces'
import ColorUpdater from './utils/ColorUpdater'

interface Message {
  type: string
  value: string
}

export default function ParentComponent() {
  const [ticketsData, setTicketsData] = useState<TicketGroup[]>()
  const [onlyExistingTickets, setOnlyExistingTickets] = useState<number[]>([])
  const [isShowingModal, toggleModal] = useModal()

  useEffect(() => {
    const pathString: string = window.location.pathname
    const splitPathString: string[] = pathString.split('/')
    const eventObject: Event = {}
    for (let i = 1; i < splitPathString.length; i++) {
      const key: string = splitPathString[i]
      eventObject[key] = splitPathString[i + 1]
    }
    console.log('eventObject', eventObject)

    axios
      .get<TicketGroupsData>(
        `https://app.pokemonion.com/tnet/events/${eventObject.tickets}/ticketgroups`
      )
      .then((response: AxiosResponse<TicketGroupsData>) => {
        setTicketsData(response.data.TicketGroups)
        const ticketsWithExchangeTicketsGroupID: number[] = response.data.TicketGroups.filter(
          (el: TicketGroup): boolean => el.ExchangeTicketGroupID !== -1
        ).map((el: TicketGroup) => el.ExchangeTicketGroupID)
        setOnlyExistingTickets(ticketsWithExchangeTicketsGroupID)
      })
      .catch((error: Error) => {
        console.error(error)
        setOnlyExistingTickets([])
      })

    const handleMessage = (
      message: Message,
      sender: chrome.runtime.MessageSender,
      sendResponse: () => void
    ) => {
      if (message.type === 'SEND_DATA') {
        localStorage.setItem('excludeProperties', message.value)
      }
    }
    chrome.runtime.onMessage.addListener(handleMessage)
    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage)
    }
  }, [])
  return (
    <>
      <ColorUpdater onlyExistingTickets={onlyExistingTickets} />

      <Overall
        totalTicketGroupCount={ticketsData?.length}
        countWithTGID={onlyExistingTickets?.length}
        countWithoutTGID={
          ticketsData && onlyExistingTickets
            ? ticketsData.length - onlyExistingTickets.length
            : undefined
        }
      />

      {ticketsData ? (
        <StatsButton
          buttonTextContent={'Show Stats'}
          toggleModal={toggleModal}
          classNames={'absolute bottom-0 right-0 mr-2 mb-2 px-8 py-4'}
        />
      ) : null}
      {ticketsData && isShowingModal ? (
        <EventStats ticketsData={ticketsData} toggleModal={toggleModal} />
      ) : null}
    </>
  )
}
