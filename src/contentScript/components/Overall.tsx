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
  useEffect(() => {
    const overallLocationDiv = document.querySelector('.event-info-inner-ctn')
    if (overallLocationDiv) {
      const overall = document.createElement('div')
      overall.classList.add('overall')
      overall.style.setProperty('padding', '10px')
      overall.style.setProperty('flex-grow', '0')
      overall.style.setProperty('width', '220px')

      if (!totalTicketGroupCount || !countWithTGID || !countWithoutTGID) {
        overall.innerHTML = spinner
      } else {
        overall.innerHTML = `
          <div>
            <p>Listings count: ${totalTicketGroupCount}</p>
            <p>With Exchange TGID: ${countWithTGID}</p>
            <p>Without Exchange TGID: ${countWithoutTGID}</p>
          </div>`
      }
      const lastChild: Element | null = overallLocationDiv.lastElementChild
      const existingOverallElements = overallLocationDiv.querySelectorAll('.overall')
      existingOverallElements.forEach(el => el.remove())

      overallLocationDiv.insertBefore(overall, lastChild)
    }
  }, [totalTicketGroupCount, countWithTGID, countWithoutTGID])

  return null
}
