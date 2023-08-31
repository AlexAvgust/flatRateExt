import React, { useEffect } from 'react'

interface OverallProps {
  totalTicketGroupCount: number
  countWithTGID: number
  countWithoutTGID: number
}

export default function Overall({
  totalTicketGroupCount,
  countWithTGID,
  countWithoutTGID
}: OverallProps) {
  useEffect(() => {
    const overallLocationDiv: HTMLElement | null = document.querySelector('.event-info-inner-ctn')
    if (overallLocationDiv) {
      const lastChild: Element | null = overallLocationDiv.lastElementChild
      const overall: HTMLDivElement = document.createElement('div')
      overall.style.setProperty('padding', '10px')
      overall.style.setProperty('flex-grow', '0')
      overall.style.setProperty('width', '220px')
      overall.innerHTML = `<div >
        <p>Overall tickets group count: ${totalTicketGroupCount}</p>
       <p>WIth TGID: ${countWithTGID}</p>
        <p>Without TGID: ${countWithoutTGID}</p>
       </div>`
      overallLocationDiv.insertBefore(overall, lastChild)
    }
  }, [])
  return <></>
}
