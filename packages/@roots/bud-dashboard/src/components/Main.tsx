import {React, Box} from '@roots/bud-support'

export const Main = ({children, ...props}) => (
  <Box
    {...props}
    justifyContent="space-between"
    display="flex"
    flexDirection="column">
    {children}
  </Box>
)
