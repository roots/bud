import React from 'react'
import {Box} from 'ink'
import useStdOutDimensions from 'ink-use-stdout-dimensions'

/**
 * App frame
 *
 * @prop {React.Element} children
 */
const App = ({children}) => {
  const [, height] = useStdOutDimensions()

  return (
    <Box
      flexDirection="column"
      height={height - 1}
      padding={1}>
      {children}
    </Box>
  )
}

export default App
