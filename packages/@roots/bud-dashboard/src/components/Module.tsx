import {React, Box, Text} from '@roots/bud-support'

export const Module = ({
  children,
  label,
  when = true,
  fallback = null,
  color = 'white',
  marginBottom = 1,
}) =>
  when ? (
    <Box flexDirection="column" marginBottom={marginBottom}>
      <Text color={color}>{label}</Text>
      <Box
        borderStyle="single"
        borderColor={color}
        paddingX={1}
        flexDirection="column">
        {children}
      </Box>
    </Box>
  ) : (
    fallback
  )
