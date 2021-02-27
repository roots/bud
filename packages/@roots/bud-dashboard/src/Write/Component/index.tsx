import {React, Box, Text, Gradient} from '@roots/bud-support'

export const Component = ({children, ...props}) => {
  return (
    <Box flexDirection="column" borderStyle="round" {...props}>
      <Gradient name="teen">
        <Text color={`white`} wrap="wrap">
          {children}
        </Text>
      </Gradient>
    </Box>
  )
}
