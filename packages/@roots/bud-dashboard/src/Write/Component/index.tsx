import {React, Box, Text} from '@roots/bud-support'

export const Component = ({children, ...props}) => {
  return (
    <Box flexDirection="column" borderStyle="round" {...props}>
      <Text color={`white`} wrap="wrap">
        {children}
      </Text>
    </Box>
  )
}
