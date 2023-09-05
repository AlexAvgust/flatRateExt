import React, { useEffect, useState } from 'react'
import DataGrid from 'react-data-grid'
import 'react-data-grid/lib/styles.css'
import { useReadLocalStorage } from 'usehooks-ts'

import { TicketGroup } from '../interfaces'
import StatsButton from './StatsButton'

interface EventStatsProps {
  ticketsData: TicketGroup[]
  toggleModal: () => void
}

interface reactDataGridColumn {
  key: string
  name: string
  width?: number
  resizable: boolean
}

const generateColumns = (ticketsData: TicketGroup[], exclude: string[]): reactDataGridColumn[] => {
  return Object.keys(ticketsData[0])
    .map((columnName: string): reactDataGridColumn => {
      return {
        key: columnName,
        name: columnName.replace(/([a-z])([A-Z])/g, '$1 $2'),
        width: 80,
        resizable: true
      }
    })
    .filter((column: reactDataGridColumn) => !exclude.includes(column.name))
}

const generateRows = (ticketsData: TicketGroup[]) => {
  return ticketsData.map((ticketData: TicketGroup) => {
    for (const key in ticketData) {
      if (Array.isArray(ticketData[key])) {
        ticketData[key] = ticketData[key].length
      }
    }
    return ticketData
  })
}

export default function EventStats({ ticketsData, toggleModal }: EventStatsProps) {
  const [exclude, setExclude] = useState<string[]>(['AdditionalNotes', 'Tags'])
  const LocalStorageExcludeValues = useReadLocalStorage<string>('excludeProperties')
  const [columns, setColumns] = useState<reactDataGridColumn[]>([
    { key: '', width: 80, resizable: true, name: '' }
  ])

  useEffect(() => {
    if (LocalStorageExcludeValues) {
      setExclude(LocalStorageExcludeValues.split(','))
    }
  }, [LocalStorageExcludeValues])

  useEffect(() => {
    if (exclude) {
      setColumns(generateColumns(ticketsData, exclude))
    }
  }, [exclude])
  console.log(columns)
  return (
    <div
      style={{ zIndex: 10000, backgroundColor: 'rgb(0,0,0,0.7)', backdropFilter: 'blur(10px)' }}
      className={'absolute top-0 h-full w-full overflow-y-hidden'}
    >
      <div
        style={{
          zIndex: 10001,
          width: '80%',
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          height: '80%',
          overflowY: 'scroll'
        }}
        className=" bg-white p-16"
      >
        <StatsButton
          buttonTextContent={'Close Stats'}
          toggleModal={toggleModal}
          classNames={'absolute left-0 top-0 my-4 ml-4  px-8 py-4'}
        />
        <h2 className="my-2 text-center text-2xl font-semibold">{ticketsData[0].EventName}</h2>
        <div>
          <DataGrid
            className={'mt-6 h-full'}
            columns={columns}
            rows={generateRows(ticketsData)}
            rowHeight={40}
          />
        </div>
      </div>
    </div>
  )
}
