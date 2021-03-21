import {React, Box} from '@roots/bud-support'

export const Main = ({children}) => (
  <Box
    justifyContent="space-between"
    display="flex"
    flexDirection="column">
    {children}
  </Box>
)
