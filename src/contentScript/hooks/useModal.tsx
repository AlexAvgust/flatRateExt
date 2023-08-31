import { useState } from 'react'

export default function UseModal(): [boolean, () => void] {
  const [isShowing, setIsShowing] = useState<boolean>(false)

  function toggle(): void {
    setIsShowing(!isShowing)
  }

  return [isShowing, toggle]
}
