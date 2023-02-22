import Ink, {React} from '@roots/bud-support/ink'

import {Log, LogProps, Stderr, Stdout} from './log.js'

export interface Props {
  messages: Array<LogProps>
}

export const Console = ({messages}: Props) => {
  if (!messages?.length) return null

  return (
    <Ink.Box flexDirection="column">
      {messages.map((item, i) => (
        <Ink.Box key={i}>
        <Log {...item} />
        </Ink.Box>
      ))}
    </Ink.Box>
  )
}

export {Log, LogProps, Stdout, Stderr}
