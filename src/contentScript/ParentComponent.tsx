import React, { useEffect, useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'

import EventStats from './components/EventStats'
import Overall from './components/Overall'
import StatsButton from './components/StatsButton'
import useModal from './hooks/useModal'
import { TicketGroup } from './interfaces'
import ColorUpdater from './utils/ColorUpdater'

interface Message {
  type: string
  value: string
}

interface ParentComponentProps {
  dataPromise: Promise<TicketGroup[]>
}

export default function ParentComponent({ dataPromise }: ParentComponentProps) {
  const [ticketsData, setTicketsData] = useState<TicketGroup[]>()
  const [onlyExistingTickets, setOnlyExistingTickets] = useState<number[]>([])
  const [isShowingModal, toggleModal] = useModal()
  const [storage, setStorage] = useLocalStorage<string>(
    'excludeProperties',
    localStorage.getItem('excludeProperties') || ''
  )
  useEffect(() => {
    dataPromise.then((ticketData: TicketGroup[]) => setTicketsData(ticketData))
  }, [dataPromise])
  useEffect(() => {
    const handleMessage = (
      message: Message,
      sender: chrome.runtime.MessageSender,
      sendResponse: () => void
    ) => {
      if (message.type === 'SEND_DATA') {
        // localStorage.setItem('excludeProperties', message.value)
        setStorage(message.value)
      }
    }
    chrome.runtime.onMessage.addListener(handleMessage)
    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage)
    }
  }, [dataPromise])
  useEffect(() => {
    if (ticketsData) {
      const ticketsWithExchangeTicketsGroupID: number[] = ticketsData
        .filter((el: TicketGroup): boolean => el.ExchangeTicketGroupID !== -1)
        .map((el: TicketGroup) => el.ExchangeTicketGroupID)
      setOnlyExistingTickets(ticketsWithExchangeTicketsGroupID)
    } else {
      setOnlyExistingTickets([])
    }
  }, [ticketsData])
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
