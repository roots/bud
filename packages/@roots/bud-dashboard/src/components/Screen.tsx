import {Box, React} from '@roots/bud-support'

export const Screen = ({children, ...props}) => (
  <Box display="flex" flexDirection="column" {...props}>
    {children}
  </Box>
)
