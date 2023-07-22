/* eslint-disable n/no-process-env */
import {BudError} from '@roots/bud-support/errors'
import figures from '@roots/bud-support/figures'
import {Box, Text} from '@roots/bud-support/ink'
import isString from '@roots/bud-support/lodash/isString'

const basePath =
  process.env.PROJECT_CWD ?? process.env.INIT_CWD ?? process.cwd()

export const Error = ({error}: {error: BudError}) => {
  if (!error) {
    error = BudError.normalize(`Unknown error`)
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
            {error.replace(basePath, `.`)}
          </Text>
        </Box>
      </Box>
    )
  }

  return (
    <Box flexDirection="column" paddingTop={1}>
      <Text backgroundColor="red" color="white">
        {` `}
        {error.name ?? `Error`}
        {` `}
      </Text>

      {error.message && (
        <Box marginTop={1}>
          <Text>
            <Text color="red">{figures.cross}</Text>
            {` `}
            {error.message.replace(basePath, `.`).replace(`Error: `, ``)}
          </Text>
        </Box>
      )}

      {error.thrownBy && (
        <Box marginTop={1}>
          <Text>
            <Text color="blue">
              {figures.ellipsis}
              {` `}Thrown by{` `}
            </Text>

            <Text>{error.thrownBy}</Text>
          </Text>
        </Box>
      )}

      {error.details && !error.details.startsWith(`resolve`) && (
        <Box marginTop={1}>
          <Text>
            <Text color="blue">
              {figures.ellipsis}
              {` `}Details{` `}
            </Text>

            <Text>{error.details.replace(basePath, `.`)}</Text>
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
