import { useCallback, useState } from 'react'

export const useToggle = (init) => {
  const [state, setState] = useState(init)

  const toggle = useCallback(() => {
    setState(!state)
  }, [state])

  return [state, toggle]
}
