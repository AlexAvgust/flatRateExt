import React, { useEffect, useState } from 'react'

import { TicketGroup } from '../interfaces'
import StatsButton from './StatsButton'

interface EventStatsProps {
  ticketsData: TicketGroup[]
  toggleModal: () => void
}

export default function EventStats({ ticketsData, toggleModal }: EventStatsProps) {
  const [exclude, setExclude] = useState<string[]>(['AdditionalNotes', 'Tags'])

  useEffect(() => {
    const localStorageExclude = localStorage.getItem('excludeProperties')
    if (localStorageExclude) {
      const parsedExclude: string[] = localStorageExclude.split(',')
      setExclude(parsedExclude)
    }
  }, [])
  console.log(exclude)
  const generateSectionRows = () => {
    return (
      <>
        {Object.values(ticketsData).map(key => {
          return (
            <React.Fragment key={Math.random()}>
              <h2 className="my-4 ml-3 text-2xl font-semibold">
                TicketGroupID {key.TicketGroupID}
              </h2>
              <div className={'m-3 grid w-max grid-cols-7'}>
                {Object.entries(key)
                  .filter((el: [string, TicketGroup]) => !exclude.includes(el[0]))
                  .map((el: [string, string | number | null | boolean]) => {
                    if (el[1] === null || el[1].toString() === '') {
                      return null
                    }
                    return (
                      <React.Fragment key={Math.random()}>
                        <div className="flex w-[110px] flex-col border border-gray-300 bg-gray-100  ">
                          <p className={'py-2 text-center text-base'}>
                            {el[0] === 'Tickets' ? 'TicketsQuantity' : el[0]}
                          </p>
                          <div className={'bg-white py-4 text-center text-sm'}>
                            {Array.isArray(el[1]) ? el[1].length : el[1].toString()}
                          </div>
                        </div>
                      </React.Fragment>
                    )
                  })}
              </div>
            </React.Fragment>
          )
        })}
      </>
    )
  }

  return (
    <div
      style={{ zIndex: 10000, backgroundColor: 'rgb(0,0,0,0.7)', backdropFilter: 'blur(10px)' }}
      className={'absolute top-0 h-full w-full overflow-y-hidden'}
    >
      <div
        style={{ zIndex: 10001, transform: 'translate(25%, 100px)', height: '80%' }}
        className="absolute left-[50%] top-0 h-full translate-x-1/4 overflow-y-scroll bg-white p-4"
      >
        <StatsButton
          buttonTextContent={'Close Stats'}
          toggleModal={toggleModal}
          classNames={'absolute left-0 top-0 my-4 ml-4  px-8 py-4'}
        />
        <h2 className="my-2 text-center text-2xl font-semibold">{ticketsData[0].EventName}</h2>
        {generateSectionRows()}
      </div>
    </div>
  )
}
