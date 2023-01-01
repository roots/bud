import Ink from '@roots/bud-support/ink'
import React from '@roots/bud-support/react'

import {Log, LogProps, Stderr, Stdout} from './log.js'

export interface Props {
  messages: Array<LogProps>
}

export const Console = ({messages}: Props) => {
  if (!messages?.length) return null

  return (
    <Ink.Box>
      {messages.map((item, i) => (
        <Log key={i} {...item} />
      ))}
    </Ink.Box>
  )
}

export {Log, LogProps, Stdout, Stderr}
