import {Box, Text} from '@roots/bud-support/ink'
import React from '@roots/bud-support/react'

export type Props = React.PropsWithChildren<{
  label: string
  message?: React.ReactElement | string
}>

export const Error = ({children, label, message}: Props) => {
  return (
    <Box flexDirection="column" marginY={1}>
      <Text backgroundColor="red" color="white">
        {label}
      </Text>

      {children ? children : <Message>{message}</Message>}
    </Box>
  )
}

export const Message = ({children}: React.PropsWithChildren<{}>) => (
  <Box flexDirection="column">
    <Text>{children}</Text>
  </Box>
)
