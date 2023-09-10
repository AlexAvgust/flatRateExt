import { useEffect } from 'react'
import { useLocalStorage } from 'usehooks-ts'

interface Message {
  type: string
  value: string
}
export default function useExtensionLocalStorage(): [
  string,
  (value: ((prevState: string) => string) | string) => void
] {
  const [storage, setStorage] = useLocalStorage<string>(
    'excludeProperties',
    localStorage.getItem('excludeProperties') || ''
  )

  useEffect(() => {
    const handleMessage = (
      message: Message,
      sender: chrome.runtime.MessageSender,
      sendResponse: () => void
    ) => {
      if (message.type === 'SEND_DATA') {
        setStorage(message.value)
      }
    }
    chrome.runtime.onMessage.addListener(handleMessage)
    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage)
    }
  }, [])

  return [storage, setStorage]
}
