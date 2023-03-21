import * as Ink from 'ink'

export type Props = React.PropsWithChildren<{
  name: string
  message?: React.ReactElement | string
  stack?: string
}>

export const Error = ({children, name, message, stack}: Props) => {
  return (
    <Ink.Box flexDirection="column" paddingTop={1}>
      <Ink.Text backgroundColor="red" color="white">
        {` `}
        {name}
        {` `}
      </Ink.Text>

      {message ? (
        <>
          <Ink.Text>{` `}</Ink.Text>
          <Message>{message}</Message>
        </>
      ) : null}

      {children ? (
        <>
          <Ink.Text>{` `}</Ink.Text>
          {children}
        </>
      ) : null}

      {stack ? (
        <>
          <Ink.Text>{` `}</Ink.Text>
          <Ink.Text dimColor>
            {stack
              ?.split(`\n`)
              .splice(1, 3)
              .map(ln => ln.trim())
              .join(`\n`)}
          </Ink.Text>
        </>
      ) : null}
    </Ink.Box>
  )
}

export const Message = ({children}: React.PropsWithChildren<{}>) => (
  <Ink.Box flexDirection="column">
    <Ink.Text>{children}</Ink.Text>
  </Ink.Box>
)
