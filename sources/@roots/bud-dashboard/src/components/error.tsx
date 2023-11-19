/* eslint-disable n/no-process-env */
import {BudError} from '@roots/bud-support/errors'
import figures from '@roots/bud-support/figures'
import {Box, type ReactNode, Static, Text} from '@roots/bud-support/ink'

type RawError = BudError | Error | string | undefined

const cleanErrorObject = (error: RawError): BudError => {
  if (!error) {
    error = new BudError(`Unknown error`)
  }

  if (typeof error === `string`) {
    error = new BudError(error)
  }

  return error instanceof BudError ? error : BudError.normalize(error)
}

export const Error = ({error: input}: {error: RawError}): ReactNode => {
  return (
    <Static items={[0]}>{(_, key) => <Display error={input} />}</Static>
  )
}

export const Display = ({error: input}: {error: RawError}) => {
  const error = cleanErrorObject(input)

  return (
    <Box flexDirection="column" gap={1} paddingTop={1}>
      {error.name && (
        <Box flexDirection="row" gap={1}>
          <Text color="red">{figures.cross}</Text>
          <Text backgroundColor="red" color="white">
            {error.name}
          </Text>
        </Box>
      )}

      {error.message && (
        <Box flexDirection="row" gap={1}>
          <Text>{error.message}</Text>
        </Box>
      )}

      {error.details && !error.details.startsWith(`resolve`) && (
        <Box>
          <Text>
            <Text color="blue">
              {figures.ellipsis}
              {` `}Details{` `}
            </Text>

            <Text>{error.details}</Text>
          </Text>
        </Box>
      )}

      {error.thrownBy && (
        <Box flexDirection="row" gap={1}>
          <Text color="blue">
            {figures.ellipsis}
            {` `}Thrown by{` `}
          </Text>
          <Text>{error.thrownBy}</Text>
        </Box>
      )}

      {error.docs && (
        <Box>
          <Text>
            <Text color="blue">
              {figures.arrowRight}
              {` `}Documentation{` `}
            </Text>
            <Text>{error.docs.href}</Text>
          </Text>
        </Box>
      )}

      {error.issues && (
        <Box gap={1}>
          <Text>
            <Text color="blue">{figures.arrowRight}</Text>
            <Text color="blue">Issues</Text>
            <Text>{error.issues.href}</Text>
          </Text>
        </Box>
      )}

      {error.file && (
        <Box gap={1}>
          <Text color="blue">{figures.info}</Text>
          <Text color="blue">See file</Text>
          <Text>{error.file.path}</Text>
        </Box>
      )}

      {(!error.origin || !(error.origin instanceof BudError)) &&
        error.stack && (
          <Box flexDirection="column" gap={1}>
            <Text color="blue">{figures.home}</Text>
            <Text color="blue">Stack trace</Text>
            <Box
              borderBottom={false}
              borderColor="red"
              borderLeft
              borderRight={false}
              borderStyle="single"
              borderTop={false}
              paddingLeft={1}
            >
              <Text>{error.stack}</Text>
              tT
            </Box>
          </Box>
        )}

      {error.origin && error.origin instanceof BudError && error.stack && (
        <Box flexDirection="column" gap={1}>
          <Box flexDirection="row" gap={1}>
            <Text color="blue">{figures.ellipsis}</Text>
            <Text color="blue">Details</Text>
          </Box>

          <Box
            borderBottom={false}
            borderColor="red"
            borderLeft
            borderRight={false}
            borderStyle="single"
            borderTop={false}
            flexDirection="column"
            gap={1}
            paddingLeft={1}
          >
            <Text>{error.origin.message}</Text>
            {error.origin.stack && (
              <Text dimColor>{error.origin.stack}</Text>
            )}
          </Box>
        </Box>
      )}
    </Box>
  )
}
