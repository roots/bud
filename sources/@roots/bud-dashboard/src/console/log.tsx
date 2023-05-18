import {Message} from './message.js'

export interface LogProps {
  stream: `stdout` | `stderr`
  message: string
}

export const Stderr = ({message}: {message: string}) => (
  <Message label="stderr" color="red" message={message} />
)

export const Stdout = ({message}: {message: string}) => (
  <Message label="stdout" color="green" message={message} />
)

export const Log = ({stream, message}: LogProps) => {
  switch (stream) {
    case `stdout`:
      return <Stdout message={message} />

    case `stderr`:
      return <Stderr message={message} />
  }
}
