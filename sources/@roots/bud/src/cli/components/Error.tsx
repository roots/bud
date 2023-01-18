import Ink from '@roots/bud-support/ink'
import React from '@roots/bud-support/react'

export type Props = React.PropsWithChildren<{
  label: string
  message?: React.ReactElement | string
}>

export const Error = ({children, label, message}: Props) => {
  return (
    <Ink.Box flexDirection="column" marginY={1}>
      <Ink.Text backgroundColor="red" color="white">
        {label}
      </Ink.Text>

      {children ? children : <Message>{message}</Message>}
    </Ink.Box>
  )
}

export const Message = ({children}: React.PropsWithChildren<{}>) => (
  <Ink.Box flexDirection="column">
    <Ink.Text>{children}</Ink.Text>
  </Ink.Box>
)
