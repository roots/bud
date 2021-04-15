import React from 'react'
import {Box} from 'ink'

export const Screen = ({children}) => (
  <Box
    display="flex"
    justifyContent="space-between"
    flexDirection="column">
    {children}
  </Box>
)
