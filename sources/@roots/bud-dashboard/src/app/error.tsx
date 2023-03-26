/* eslint-disable n/no-process-env */
import type {BudHandler} from '@roots/bud-support/errors'
import figures from '@roots/bud-support/figures'
import * as Ink from 'ink'
import cleanStack from '@roots/bud-support/clean-stack'

export type Props = React.PropsWithChildren<{
  error: BudHandler
}>

export const Error = ({error}: Props) => {
  if (!error) {
    return (
      <Ink.Box>
        <Ink.Text>An unknown error has occurred.</Ink.Text>
      </Ink.Box>
    )
  }

  return (
    <Ink.Box flexDirection="column" paddingTop={1}>
      <Ink.Text backgroundColor="red" color="white">
        {` `}
        {error.name}
        {` `}
      </Ink.Text>

      {error.message ? (
        <Ink.Box marginTop={1}>
          <Ink.Text>
            <Ink.Text color="red">{figures.cross}</Ink.Text>
            {` `}
            {error.message}
          </Ink.Text>
        </Ink.Box>
      ) : null}

      {error.details && (
        <Ink.Box marginTop={1}>
          <Ink.Text>
            <Ink.Text color="blue">
              {figures.arrowRight}
              {` `}Details{` `}
            </Ink.Text>

            <Ink.Text>{error.details}</Ink.Text>
          </Ink.Text>
        </Ink.Box>
      )}

      {error.thrownBy && (
        <Ink.Box marginTop={1}>
          <Ink.Text>
            <Ink.Text color="blue">
              {figures.arrowRight}
              {` `}Thrown by
            </Ink.Text>
            {` `}
            <Ink.Text>{error.thrownBy}</Ink.Text>
          </Ink.Text>
        </Ink.Box>
      )}

      {error.file && (
        <Ink.Box marginTop={1}>
          <Ink.Text>
            <Ink.Text color="blue">
              {figures.arrowRight}
              {` `}Related
            </Ink.Text>
            {` `}
            <Ink.Text>
              {error.file.name} ({error.file.path})
            </Ink.Text>
          </Ink.Text>
        </Ink.Box>
      )}

      {!error.origin && error.stack && (
        <Ink.Box marginTop={1} flexDirection="column">
          <Ink.Text color="blue">
            {figures.arrowRight}
            {` `}Stack trace
          </Ink.Text>
          <Ink.Text dimColor>
            {cleanStack(error.stack, {
              basePath:
                process.env.PROJECT_CWD ??
                process.env.INIT_CWD ??
                process.cwd(),
              pretty: true,
            })
              .split(`\n`)
              .slice(1, 5)
              .join(`\n`)}
          </Ink.Text>
        </Ink.Box>
      )}

      {error.docs && (
        <Ink.Box marginTop={1}>
          <Ink.Text>
            <Ink.Text color="blue">
              {figures.arrowRight}
              {` `}Documentation
            </Ink.Text>
            {` `}
            <Ink.Text>{error.docs.href}</Ink.Text>
          </Ink.Text>
        </Ink.Box>
      )}

      {error.issues && (
        <Ink.Box marginTop={1}>
          <Ink.Text>
            <Ink.Text color="blue">
              {figures.arrowRight}
              {` `}
              Issues
            </Ink.Text>
            {` `}
            <Ink.Text>{error.issues.href}</Ink.Text>
          </Ink.Text>
        </Ink.Box>
      )}

      {error.origin && (
        <Ink.Box>
          <Error error={error.origin} />
        </Ink.Box>
      )}
    </Ink.Box>
  )
}

export const Message = ({children}: React.PropsWithChildren<{}>) => (
  <Ink.Box flexDirection="column">
    <Ink.Text>{children}</Ink.Text>
  </Ink.Box>
)
