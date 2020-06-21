import React from 'react'
import {Box} from 'ink'

import Banner from './Banner'
import Status from './Status'

/**
 * App frame
 *
 * @prop {React.Element} children
 */
const App = ({assets, height, mode, width, children}) => {
  return (
    <Box
      width={width}
      height={height}
      flexDirection="column"
      justifyContent="space-between">
      <Box flexDirection="column" width={width}>
        <Banner />

        {children}
      </Box>

      <Status assets={assets} mode={mode} width={width} />
    </Box>
  )
}

export default App
