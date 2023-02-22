import {React} from '@roots/bud-support/ink'

import {Message} from './message.js'

export interface LogProps extends React.ComponentProps<typeof Message> {
  stream: `stdout` | `stderr`
  message: string
}

export const Stderr = (props: LogProps) => (
  <Message label="stderr" color="red" {...props} />
)

export const Stdout = (props: LogProps) => (
  <Message label="stdout" color="green" {...props} />
)

export const Log = (props: LogProps) => {
  switch (props.stream) {
    case `stdout`:
      return <Stdout {...props} />
    case `stderr`:
      return <Stderr {...props} />
  }
}
