import {Message} from './message.js'

export interface LogProps {
  message: string
  stream: `stderr` | `stdout`
}

export const Stderr = ({message}: {message: string}) => (
  <Message color="red" label="stderr" message={message} />
)

export const Stdout = ({message}: {message: string}) => (
  <Message color="green" label="stdout" message={message} />
)

export const Log = ({message, stream}: LogProps) => {
  switch (stream) {
    case `stdout`:
      return <Stdout message={message} />

    case `stderr`:
      return <Stderr message={message} />
  }
}
