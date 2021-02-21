import {React, Box} from '@roots/bud-support'

export const Main = ({children, height}) => (
  <Box
    height={height}
    justifyContent="space-between"
    display="flex"
    flexDirection="column">
    {children}
  </Box>
)
