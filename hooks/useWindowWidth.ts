import { useState, useEffect } from "react"

export function useWindowWidth() {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    function handleResize() {
      setWidth(window?.innerWidth)
    }

    handleResize() // Define valor inicial na montagem

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return { width }
}
