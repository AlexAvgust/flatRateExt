import React from 'react'
import { createRoot } from 'react-dom/client'
import 'tailwindcss/tailwind.css'

import '../styles/content_script.scss'
import '../styles/global.scss'
import '../styles/tailwind.scss'
import ParentComponent from './ParentComponent'
import { Event } from './interfaces'

const pathString: string = window.location.pathname
const splitPathString: string[] = pathString.split('/')
const eventObject: Event = {}
for (let i = 1; i < splitPathString.length; i++) {
  const key: string = splitPathString[i]
  eventObject[key] = splitPathString[i + 1]
}

document.onreadystatechange = function () {
  const stylesheet = document.createElement('link')
  stylesheet.rel = 'stylesheet'
  stylesheet.href = 'https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.0.4/tailwind.min.css'
  document.head.appendChild(stylesheet)
}

const body = document.querySelector('body')
const panelContainer = document.createElement('div')
if (!panelContainer || !body) {
  throw new Error('Could not create the panel container')
}
body.appendChild(panelContainer)
const root = createRoot(panelContainer)
root.render(<ParentComponent eventObject={eventObject} />)
