import {Box} from 'ink'
import React from 'react'

/**
 * Container
 *
 * @public
 */
export const Main = ({children}) => (
  <Box
    justifyContent="space-between"
    display="flex"
    flexDirection="column"
  >
    {children}
  </Box>
)
