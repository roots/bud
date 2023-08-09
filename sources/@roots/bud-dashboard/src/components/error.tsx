/* eslint-disable n/no-process-env */
import {BudError} from '@roots/bud-support/errors'
import figures from '@roots/bud-support/figures'
import {Box, type ReactNode, Static, Text} from '@roots/bud-support/ink'
import isString from '@roots/bud-support/lodash/isString'

const basePath =
  process.env.PROJECT_CWD ?? process.env.INIT_CWD ?? process.cwd()

export const Error = ({error}: {error: unknown}): ReactNode => {
  let normalError: BudError

  if (!error) {
    normalError = BudError.normalize(`Unknown error`)
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

  normalError =
    error instanceof BudError ? error : BudError.normalize(error)

  return (
    <Static items={[0]}>
      {() => (
        <Box flexDirection="column" paddingTop={1}>
          <Text backgroundColor="red" color="white">
            {` `}
            {normalError.name ?? `Error`}
            {` `}
          </Text>

          {normalError.message && (
            <Box marginTop={1}>
              <Text>
                <Text color="red">{figures.cross}</Text>
                {` `}
                {normalError.message
                  .replace(basePath, `.`)
                  .replace(`Error: `, ``)}
              </Text>
            </Box>
          )}

          {normalError.details &&
            !normalError.details.startsWith(`resolve`) && (
              <Box marginTop={1}>
                <Text>
                  <Text color="blue">
                    {figures.ellipsis}
                    {` `}Details{` `}
                  </Text>

                  <Text>{normalError.details.replace(basePath, `.`)}</Text>
                </Text>
              </Box>
            )}

          {normalError.thrownBy && (
            <Box marginTop={1}>
              <Text>
                <Text color="blue">
                  {figures.ellipsis}
                  {` `}Thrown by{` `}
                </Text>

                <Text>{normalError.thrownBy}</Text>
              </Text>
            </Box>
          )}

          {normalError.docs && (
            <Box marginTop={1}>
              <Text>
                <Text color="blue">
                  {figures.arrowRight}
                  {` `}Documentation
                </Text>
                {` `}
                <Text>{normalError.docs.href}</Text>
              </Text>
            </Box>
          )}

          {normalError.issues && (
            <Box marginTop={1}>
              <Text>
                <Text color="blue">
                  {figures.arrowRight}
                  {` `}
                  Issues
                </Text>
                {` `}
                <Text>{normalError.issues.href}</Text>
              </Text>
            </Box>
          )}

          {normalError.file && (
            <Box marginTop={1}>
              <Text color="blue">
                {figures.info}
                {` `}See file{` `}
              </Text>
              <Text>{normalError.file.path}</Text>
            </Box>
          )}

          {normalError.origin && (
            <Box flexDirection="column" marginTop={1}>
              <Text color="blue">
                {figures.home}
                {` `}Originating error{` `}
              </Text>

              <Box
                borderBottom={false}
                borderColor="red"
                borderLeft
                borderRight={false}
                borderStyle="single"
                borderTop={false}
                paddingLeft={1}
              >
                <Error error={normalError.origin} />
              </Box>
            </Box>
          )}

          {normalError.stack && (
            <Box flexDirection="column" marginTop={1}>
              <Text color="blue">
                {figures.home}
                {` `}Stack trace{` `}
              </Text>

              <Box
                borderBottom={false}
                borderColor="red"
                borderLeft
                borderRight={false}
                borderStyle="single"
                borderTop={false}
                paddingLeft={1}
              >
                <Text>{normalError.stack}</Text>
              </Box>
            </Box>
          )}
        </Box>
      )}
    </Static>
  )
}

export const Message = ({children}: React.PropsWithChildren<{}>) => (
  <Box flexDirection="column">
    <Text>{children}</Text>
  </Box>
)
