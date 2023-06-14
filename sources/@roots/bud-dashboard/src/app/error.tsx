/* eslint-disable n/no-process-env */
import cleanStack from '@roots/bud-support/clean-stack'
import {BudError, type BudHandler} from '@roots/bud-support/errors'
import figures from '@roots/bud-support/figures'
import {Box, Text} from '@roots/bud-support/ink'
import isString from '@roots/bud-support/lodash/isString'

export type Props = React.PropsWithChildren<{
  error: BudHandler
  message?: string
  name?: string
}>

const basePath =
  process.env.PROJECT_CWD ?? process.env.INIT_CWD ?? process.cwd()

export const Error = ({error, ...props}: Props) => {
  if (!error) {
    error = BudError.normalize({...props})
  }

  if (isString(error)) {
    return (
      <Box flexDirection="column" paddingTop={1}>
        <Text backgroundColor="red" color="white">
          {` Error `}
        </Text>
        <Box marginTop={1}>
          <Text>
            <Text color="red">{figures.cross}</Text>
            {` `}
            {error}
          </Text>
        </Box>
      </Box>
    )
  }

  return (
    <Box flexDirection="column" paddingTop={1}>
      <Text backgroundColor="red" color="white">
        {` `}
        {error.name}
        {` `}
      </Text>

      {error.message ? (
        <Box marginTop={1}>
          <Text>
            <Text color="red">{figures.cross}</Text>
            {` `}
            {error.message}
          </Text>
        </Box>
      ) : null}

      {error.details && (
        <Box marginTop={1}>
          <Text>
            <Text color="blue">
              {figures.ellipsis}
              {` `}Error details{` `}
            </Text>

            <Text>{error.details}</Text>
          </Text>
        </Box>
      )}

      {!error.origin && error.stack && (
        <Box flexDirection="column" marginTop={1}>
          <Text color="blue">
            {figures.hamburger}
            {` `}Stack trace
          </Text>

          <Text dimColor>
            {cleanStack(error.stack, {
              basePath,
              pretty: true,
            })}
          </Text>
        </Box>
      )}

      {error.docs && (
        <Box marginTop={1}>
          <Text>
            <Text color="blue">
              {figures.arrowRight}
              {` `}Documentation
            </Text>
            {` `}
            <Text>{error.docs.href}</Text>
          </Text>
        </Box>
      )}

      {error.issues && (
        <Box marginTop={1}>
          <Text>
            <Text color="blue">
              {figures.arrowRight}
              {` `}
              Issues
            </Text>
            {` `}
            <Text>{error.issues.href}</Text>
          </Text>
        </Box>
      )}

      {error.origin && (
        <Box>
          <Error error={error.origin} />
        </Box>
      )}

      {error.file && (
        <Box marginTop={1}>
          <Text color="blue">
            {figures.info}
            {` `}See file{` `}
          </Text>
          <Text>{error.file.path}</Text>
        </Box>
      )}
    </Box>
  )
}

export const Message = ({children}: React.PropsWithChildren<{}>) => (
  <Box flexDirection="column">
    <Text>{children}</Text>
  </Box>
)
