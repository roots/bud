import React from 'react'
import {Box} from 'ink'
import Gradient from 'ink-gradient'
import BigText from 'ink-big-text'

export const Layout = ({name, children}) => (
  <Box
    display="flex"
    flexDirection="column"
    justifyContent="flex-start">
    <Gradient name="teen">
      <BigText font="tiny" text={name} />
    </Gradient>

    <Box
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      paddingX={1}>
      {children}
    </Box>
  </Box>
)
