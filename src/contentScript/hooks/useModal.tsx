import { useState } from 'react'

export default function UseModal(): [boolean, () => void] {
  const [isShowing, setIsShowing] = useState<boolean>(false)
  console.log(isShowing)
  function toggle(): void {
    setIsShowing(!isShowing)
  }

  return [isShowing, toggle]
}
