import {useState, useEffect} from 'react'
import useStdoutDimensions from 'ink-use-stdout-dimensions'

/**
 * Use view
 */
const useView = () => {
  const padding = 4

  const [columns, rows] = useStdoutDimensions()
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    rows && setWidth(rows - padding)
    columns && setHeight(columns - padding)
  }, [rows, columns])

  return [width, height]
}

export default useView