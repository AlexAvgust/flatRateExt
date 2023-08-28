import React from 'react'
import { createRoot } from 'react-dom/client'

import '../styles/content_script.scss'
import '../styles/global.scss'
import '../styles/tailwind.scss'
import ColorUpdater from './ColorUpdater'

document.onreadystatechange = function () {
  if (document.readyState === 'complete') {
    insertColorUpdater()
  }
}
function insertColorUpdater() {
  const body = document.querySelector('body')
  const panelContainer = document.createElement('div')
  if (!panelContainer || !body) {
    throw new Error('Could not create the panel container')
  }
  body.appendChild(panelContainer)
  const root = createRoot(panelContainer)
  root.render(<ColorUpdater />)
}
