import axios, { AxiosResponse } from 'axios'
import React, { useEffect, useState } from 'react'

import EventStats from './components/EventStats'
import Overall from './components/Overall'
import StatsButton from './components/StatsButton'
import useModal from './hooks/useModal'
import { Event, TicketGroup, TicketGroupsData } from './interfaces'
import ColorUpdater from './utils/ColorUpdater'

interface ParentComponentProps {
  eventObject: Event
}

export default function ParentComponent({ eventObject }: ParentComponentProps) {
  const [ticketsData, setTicketsData] = useState<TicketGroup[]>()
  const [onlyExistingTickets, setOnlyExistingTickets] = useState<number[]>([])
  const [isShowingModal, toggleModal] = useModal()

  useEffect(() => {
    console.log('eventObject', eventObject)
    if (eventObject !== undefined) {
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
    }
  }, [eventObject])
  console.log(isShowingModal)
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
