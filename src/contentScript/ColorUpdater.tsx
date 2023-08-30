import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { TicketGroup, TicketGroupsData } from './interfaces';

type Event = Record<string, string>

function updateColors(container: HTMLElement, arrayOfIds: number[]): void {
  // eslint-disable-next-line no-undef
  const rows: NodeListOf<HTMLElement> = container.querySelectorAll('[data-id]');

  rows.forEach((row: HTMLElement) => {
    const attributeId = Number(row.getAttribute('data-id'));
    if (arrayOfIds.includes(attributeId)) {
      row.style.backgroundColor = 'yellow';
    }
  });
}

export default function ColorUpdater() {
  const [onlyExistingTickets, setOnlyExistingTickets] = useState<number[]>([]);
  const [eventObject, setEventObject] = useState<Event>();

  useEffect(() => {
    const pathString: string = window.location.pathname;
    const splitPathString: string[] = pathString.split('/').splice(1);
    const eventObject: Event = {};
    for (let i = 0; i < splitPathString.length; i += 2) {
      const key: string = splitPathString[i];
      const value: string = splitPathString[i + 1];
      eventObject[key] = value;
    }
    setEventObject(eventObject);
  }, []);

  useEffect((): void => {
    if (eventObject !== undefined) {
      axios
        .get<TicketGroupsData>(`https://app.pokemonion.com/tnet/events/${eventObject.tickets}/ticketgroups`)
        .then((response: AxiosResponse<TicketGroupsData>) => {
          const filteredTickets: number[] = response.data.TicketGroups.filter((el: TicketGroup): boolean => el.ExchangeTicketGroupID !== -1).map((el: TicketGroup) => el.ExchangeTicketGroupID);
          setOnlyExistingTickets(filteredTickets);
        })
        .catch(error => {
          console.error(error);
          setOnlyExistingTickets([]);
        });
    }
  }, [eventObject]);

  useEffect(() => {
    let observer: MutationObserver;

    const ticketsTable: HTMLElement = document.getElementById('content-area') as HTMLElement;

    // eslint-disable-next-line no-undef
    const mutationCallback: MutationCallback = function(mutationsList: MutationRecord[], observer) {
      for (const mutation of mutationsList) {
        updateColors(ticketsTable, onlyExistingTickets);
      }
    };
    observer = new MutationObserver(mutationCallback);

    observer.observe(ticketsTable, { attributes: true, childList: true, subtree: true });

    updateColors(ticketsTable, onlyExistingTickets);

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [onlyExistingTickets]);

  return <></>;
}
