import axios, { AxiosError, AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'

import { Event, TicketGroup, TicketGroupsData } from '../interfaces'

export default function useGetTicketsData(): [TicketGroup[] | undefined, string | undefined] {
  const [ticketsData, setTicketsData] = useState<TicketGroup[]>()
  const [error, setError] = useState<string>()
  const pathString: string = window.location.pathname
  const splitPathString: string[] = pathString.split('/')
  const eventObject: Event = {}
  for (let i = 1; i < splitPathString.length; i++) {
    const key: string = splitPathString[i]
    eventObject[key] = splitPathString[i + 1]
  }
  useEffect(() => {
    axios
      .get<TicketGroupsData>(
        `https://app.pokemonion.com/tnet/events/${eventObject.tickets}/ticketgroups`
      )
      .then((res: AxiosResponse<TicketGroupsData>) => {
        if (res.data.Message == 'No matching ticket group(s) found.') {
          setError(res.data.Message)
        } else {
          setTicketsData(res.data.TicketGroups)
        }
      })
      .catch((error: AxiosError) => {
        setError(`Could not receive data. Error : ${error} `)
      })
  }, [])

  return [ticketsData, error]
}
