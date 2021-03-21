import {Box, React} from '@roots/bud-support'

export const Screen = ({children}) => (
  <Box
    display="flex"
    justifyContent="space-between"
    flexDirection="column">
    {children}
  </Box>
)
