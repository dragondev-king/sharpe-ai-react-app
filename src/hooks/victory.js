import { useState, useEffect, useCallback } from "react"

export const useClientSize = (ref, width = 600, height) => {
  const [size, setSize] = useState({ width, height})
  const getClientSize = useCallback(() => {
    setSize({
      width: ref.current?.clientWidth || width,
      height: ref.current?.clientHeight || height,
    })
  }, [ref, width, height])
  useEffect(() => {
    window.addEventListener('resize', getClientSize)
    getClientSize()
    return () => {
      window.removeEventListener('resize', getClientSize)
    }
  }, [getClientSize])
  return size
}
