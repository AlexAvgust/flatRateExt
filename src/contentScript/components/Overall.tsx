import { useEffect } from 'react'

import spinner from '../utils/spinner'

interface OverallProps {
  totalTicketGroupCount: number | undefined
  countWithTGID: number | undefined
  countWithoutTGID: number | undefined
}

export default function Overall({
  totalTicketGroupCount,
  countWithTGID,
  countWithoutTGID
}: OverallProps) {
  const updateOverallContent = () => {
    const overallLocationDiv = document.querySelector('.event-info-inner-ctn')

    if (overallLocationDiv) {
      const overall = document.createElement('div')
      overall.classList.add('overall')
      overall.style.setProperty('padding', '10px')
      overall.style.setProperty('flex-grow', '0')
      overall.style.setProperty('width', '220px')

      if (
        totalTicketGroupCount !== undefined &&
        countWithTGID !== undefined &&
        countWithoutTGID !== undefined
      ) {
        overall.innerHTML = `
          <div>
            <p>Listings count: ${totalTicketGroupCount}</p>
            <p>With Exchange TGID: ${countWithTGID}</p>
            <p>Without Exchange TGID: ${countWithoutTGID}</p>
          </div>`
      } else {
        overall.innerHTML = spinner
      }
      const lastChild: Element | null = overallLocationDiv.lastElementChild
      const existingOverallElements = overallLocationDiv.querySelectorAll('.overall')
      existingOverallElements.forEach(el => el.remove())

      overallLocationDiv.insertBefore(overall, lastChild)
    }
  }

  useEffect(() => {
    updateOverallContent()
  }, [totalTicketGroupCount, countWithTGID, countWithoutTGID])

  return null
}
