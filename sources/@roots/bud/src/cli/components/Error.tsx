import Ink from '@roots/bud-support/ink'
import React from '@roots/bud-support/react'

import {isWindows} from '../helpers/isWindows.js'
import {WinError} from './WinError.js'

export type Props = React.PropsWithChildren<{
  name: string
  message?: React.ReactElement | string
  stack?: React.ReactElement | string
}>

export const Error = ({children, name, message, stack}: Props) => {
  return (
    <Ink.Box flexDirection="column" marginTop={1}>
      <Ink.Text backgroundColor="red" color="white">
        {` `}
        {name}
        {` `}
      </Ink.Text>

      {children ? children : <Message>{message}</Message>}

      {stack && <Message>{stack}</Message>}

      {isWindows() && <WinError />}
    </Ink.Box>
  )
}

export const Message = ({children}: React.PropsWithChildren<{}>) => (
  <Ink.Box flexDirection="column">
    <Ink.Text>{children}</Ink.Text>
  </Ink.Box>
)
