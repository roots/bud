import React from 'react'
import {Box} from 'ink'
import useStdoutDimensions from 'ink-use-stdout-dimensions'

/**
 * App frame
 *
 * @prop {React.Element} children
 */
const App = ({children}) => {
  return (
    <Box
      flexDirection="column"
      marginRight={1}
      marginLeft={1}>
      {children}
    </Box>
  )
}

export default App
