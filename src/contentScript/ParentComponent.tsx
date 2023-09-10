import React, { useEffect, useState } from 'react'

import Error from './components/Error'
import EventStats from './components/EventStats'
import Overall from './components/Overall'
import StatsButton from './components/StatsButton'
import useGetTicketsData from './hooks/useGetTicketsData'
import useModal from './hooks/useModal'
import { TicketGroup } from './interfaces'
import ColorUpdater from './utils/ColorUpdater'

export default function ParentComponent() {
  const [ticketsData, error] = useGetTicketsData()
  const [onlyExistingTickets, setOnlyExistingTickets] = useState<number[]>([])
  const [isShowingModal, toggleModal] = useModal()
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false)

  useEffect(() => {
    if (ticketsData) {
      const ticketsWithExchangeTicketsGroupID: number[] = ticketsData
        .filter((el: TicketGroup): boolean => el.ExchangeTicketGroupID !== -1)
        .map((el: TicketGroup) => el.ExchangeTicketGroupID)
      setOnlyExistingTickets(ticketsWithExchangeTicketsGroupID)
    } else {
      setOnlyExistingTickets([])
    }
    if (error) {
      setShowErrorMessage(true)
    }
  }, [ticketsData, error])

  const isShowModal = ticketsData && isShowingModal
  return (
    <>
      {showErrorMessage ? (
        <Error errorText={error} setShowErrorMessage={setShowErrorMessage} />
      ) : null}
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
      {isShowModal ? <EventStats ticketsData={ticketsData} toggleModal={toggleModal} /> : null}
    </>
  )
}
