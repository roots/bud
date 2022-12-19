import React from '@roots/bud-support/react'

import {Log, LogProps, Stderr, Stdout} from './log.js'

export interface Props {
  messages: Array<LogProps>
}

export const Console = ({messages}: Props) => {
  if (!messages?.length) return null

  return (
    <React.Fragment>
      {messages.map((item, i) => (
        <Log key={i} {...item} />
      ))}
    </React.Fragment>
  )
}

export {Log, LogProps, Stdout, Stderr}
