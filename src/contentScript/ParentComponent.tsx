import axios, { AxiosResponse } from 'axios'
import React, { useEffect, useState } from 'react'

import Overall from './components/Overall'
import { TicketGroup, TicketGroupsData } from './interfaces'
import ColorUpdater from './utils/ColorUpdater'

type Event = Record<string, string>

export default function ParentComponent() {
  const [ticketsData, setTicketsData] = useState<TicketGroup[]>()
  const [onlyExistingTickets, setOnlyExistingTickets] = useState<number[]>([])
  const [eventObject, setEventObject] = useState<Event>()

  useEffect(() => {
    const pathString: string = window.location.pathname
    const splitPathString: string[] = pathString.split('/').splice(1)
    const eventObject: Event = {}
    for (let i = 0; i < splitPathString.length; i += 2) {
      const key: string = splitPathString[i]
      const value: string = splitPathString[i + 1]
      eventObject[key] = value
    }
    setEventObject(eventObject)
  }, [])

  useEffect((): void => {
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
  console.log(ticketsData)
  return (
    <>
      <ColorUpdater onlyExistingTickets={onlyExistingTickets} />
      {ticketsData ? (
        <Overall
          totalTicketGroupCount={ticketsData.length}
          countWithTGID={onlyExistingTickets.length}
          countWithoutTGID={ticketsData.length - onlyExistingTickets.length}
        />
      ) : (
        ''
      )}
    </>
  )
}
