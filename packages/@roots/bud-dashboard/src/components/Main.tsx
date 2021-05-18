import React from 'react'
import {Box} from 'ink'

export const Main = ({children}) => (
  <Box
    justifyContent="space-between"
    display="flex"
    flexDirection="column">
    {children}
  </Box>
)
