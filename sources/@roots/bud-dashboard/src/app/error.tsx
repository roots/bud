/* eslint-disable n/no-process-env */
import cleanStack from '@roots/bud-support/clean-stack'
import type {BudHandler} from '@roots/bud-support/errors'
import figures from '@roots/bud-support/figures'
import isString from '@roots/bud-support/lodash/isString'
import * as Ink from 'ink'

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

  if (isString(error)) {
    return (
      <Ink.Box flexDirection="column" paddingTop={1}>
        <Ink.Text backgroundColor="red" color="white">
          {` Error `}
        </Ink.Text>
        <Ink.Box marginTop={1}>
          <Ink.Text>
            <Ink.Text color="red">{figures.cross}</Ink.Text>
            {` `}
            {error}
          </Ink.Text>
        </Ink.Box>
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
              {figures.ellipsis}
              {` `}Error details{` `}
            </Ink.Text>

            <Ink.Text>{error.details}</Ink.Text>
          </Ink.Text>
        </Ink.Box>
      )}

      {!error.origin && error.stack && (
        <Ink.Box marginTop={1} flexDirection="column">
          <Ink.Text color="blue">
            {figures.hamburger}
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

      {error.file && (
        <Ink.Box marginTop={1}>
          <Ink.Text color="blue">
            {figures.info}
            {` `}See file{` `}
          </Ink.Text>
          <Ink.Text>{error.file.path}</Ink.Text>
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
