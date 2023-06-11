import {Box, Static} from '@roots/bud-support/ink'

import type {LogProps, Stderr, Stdout} from './log.js'

import {Log} from './log.js'

export interface Props {
  messages: Array<LogProps>
}

export const Console = ({messages}: Props) => {
  if (!messages?.length) return null

  return (
    <Static items={messages}>
      {(message, i) => (
        <Box flexDirection="column" key={i}>
          <Log key={i} {...message} />
        </Box>
      )}
    </Static>
  )
}

export type {Log, LogProps, Stderr, Stdout}
