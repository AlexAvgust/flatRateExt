import React, { FC, useEffect, useState } from 'react'

import { TicketGroup } from '../interfaces'
import StatsButton from './StatsButton'

interface EventStatsProps {
  ticketsData: TicketGroup[]
  toggleModal: () => void
}

const EventStats: FC<EventStatsProps> = ({ ticketsData, toggleModal }) => {
  const [excludeProperties, setExcludeProperties] = useState<string[]>(['AdditionalNotes', 'Tags'])
  const localStorageExcludeProp = localStorage.getItem('excludeProperties')
  useEffect(() => {
    if (localStorageExcludeProp !== null) setExcludeProperties(localStorageExcludeProp.split(','))
  }, [localStorageExcludeProp])
  const generateSectionRows = () => {
    return (
      <>
        {ticketsData.map((ticketGroup, index) => {
          return (
            <div
              className={
                'border border-b-0 border-gray-200 p-5 dark:border-gray-700 dark:bg-gray-900'
              }
              key={index}
            >
              <div
                className="flex w-full cursor-pointer items-center justify-between rounded-t-xl border border-b-0 border-gray-200 p-5 text-left font-medium text-gray-500 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:focus:ring-gray-800"
                onClick={() => toggleAccordion(index)}
              >
                <h2 className="my-2 text-center text-2xl font-semibold">
                  TicketGroup {ticketGroup.TicketGroupID}
                </h2>
              </div>

              {expandedAccordion === index && (
                <div className="grid w-max grid-cols-7">
                  {Object.entries(ticketGroup)
                    .filter(([key]) => !excludeProperties.includes(key))
                    .map(([key, value]) => {
                      if (value === null || value.toString() === '') {
                        return null
                      }
                      return (
                        <div
                          key={key}
                          className="flex w-[110px] flex-col border border-gray-300 bg-gray-100"
                        >
                          <p className="py-2 text-center text-base">
                            {key === 'Tickets' ? 'TicketsQuantity' : key}
                          </p>
                          <div className="bg-white py-4 text-center text-sm">
                            {Array.isArray(value) ? value.length : value.toString()}
                          </div>
                        </div>
                      )
                    })}
                </div>
              )}
            </div>
          )
        })}
      </>
    )
  }

  const [expandedAccordion, setExpandedAccordion] = useState<number | null>(0)

  const toggleAccordion = (index: number) => {
    setExpandedAccordion(prevIndex => (prevIndex === index ? null : index))
  }

  return (
    <div
      style={{
        zIndex: 10000,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(10px)'
      }}
      className="absolute top-0 h-full w-full overflow-y-hidden"
    >
      <div
        style={{
          zIndex: 10001,
          transform: 'translate(25%, 100px)',
          height: '80%'
        }}
        className="absolute left-[50%] top-0 h-full translate-x-1/4 overflow-y-scroll bg-white p-4"
      >
        <StatsButton
          buttonTextContent="Close Stats"
          toggleModal={toggleModal}
          classNames="absolute left-0 top-0 my-4 ml-4 px-8 py-4"
        />
        <h2 className="my-2 text-center text-2xl font-semibold">
          {ticketsData.length > 0 && ticketsData[0].EventName}
        </h2>
        {generateSectionRows()}
      </div>
    </div>
  )
}

export default EventStats
