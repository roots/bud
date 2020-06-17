import useStdoutDimensions from 'ink-use-stdout-dimensions'

/**
 * Use view
 */
const useView = () => {
  const [columns, rows] = useStdoutDimensions()
  const padding = 4

  return [
    rows - padding,
    columns - padding,
  ]
}

export default useView
