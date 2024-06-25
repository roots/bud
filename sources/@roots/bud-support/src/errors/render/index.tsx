/* eslint-disable n/no-process-env */
import {BudError} from '@roots/bud-support/errors'
import figures from '@roots/bud-support/figures'
import {Box, type ReactNode, Static, Text} from '@roots/bud-support/ink'
import * as ink from '@roots/bud-support/ink/instance'

type RawError = BudError | Error | string | undefined

const cleanErrorObject = (error: RawError): Partial<BudError> => {
  if (!error) {
    error = new BudError(`Unknown error`)
  }

  if (typeof error === `string`) {
    error = new BudError(error)
  }

  return error instanceof BudError ? error : BudError.normalize(error)
}

export const Error = ({error}: {error: RawError}): ReactNode => {
  return (
    <Static items={[0]}>
      {(_, key) => <Display error={cleanErrorObject(error)} key={key} />}
    </Static>
  )
}

export const Display = ({
  error,
  level,
}: {
  error: Partial<BudError>
  level?: number
}) => {
  if (!error.name && !error.message) return null

  error.name =
    level && level > 0
      ? ` → Originating in ${error.name} `
      : ` ${error.name} `

  return (
    <Box flexDirection="column" gap={1} paddingTop={1}>
      {error.name && (
        <Box flexDirection="row" gap={1}>
          <Text backgroundColor="red" color="white">
            {error.name}
          </Text>
        </Box>
      )}

      {error.message && (
        <Box flexDirection="row" gap={1}>
          <Text color="red">{figures.cross}</Text>
          <Text>{error.message}</Text>
        </Box>
      )}

      {error.details && !error.details.startsWith(`resolve`) && (
        <Box flexDirection="column" gap={1}>
          <Box flexDirection="row" gap={1}>
            <Text color="blue">{figures.ellipsis}</Text>
            <Text color="blue">Details</Text>
          </Box>
          <Text>{error.details}</Text>
        </Box>
      )}

      {error.instance && (
        <Box flexDirection="column" gap={1}>
          <Box flexDirection="row" gap={1}>
            <Text color="blue">{figures.ellipsis}</Text>
            <Text color="blue">Instance</Text>
            <Text>{error.instance}</Text>
          </Box>
        </Box>
      )}

      {error.thrownBy && (
        <Box flexDirection="column" gap={1}>
          <Box flexDirection="row" gap={1}>
            <Text color="blue">{figures.ellipsis}</Text>
            <Text color="blue">Thrown by</Text>
            <Text>{error.thrownBy.toString()}</Text>
          </Box>
        </Box>
      )}

      {error.docs && (
        <Box flexDirection="column" gap={1}>
          <Box flexDirection="row" gap={1}>
            <Text color="blue">{figures.ellipsis}</Text>
            <Text color="blue">Documentation</Text>
            <Text>{error.docs.href}</Text>
          </Box>
        </Box>
      )}

      {error.issue?.href && (
        <Box gap={1}>
          <Text>
            <Text color="blue">{figures.ellipsis}</Text>
            <Text color="blue">Issue</Text>
            <Text>{error.issue.href}</Text>
          </Text>
        </Box>
      )}

      {error.file && (
        <Box gap={1}>
          <Text color="blue">{figures.info}</Text>
          <Text color="blue">See file</Text>
          <Text>{error.file}</Text>
        </Box>
      )}

      {!error.origin && error.stack && (
        <Box flexDirection="column" gap={1}>
          <Box flexDirection="row" gap={1}>
            <Text color="blue">{figures.info}</Text>
            <Text color="blue">Stack trace</Text>
          </Box>
          <Text dimColor>{error.stack}</Text>
        </Box>
      )}

      {error.origin && (
        <Box flexDirection="column" gap={1}>
          <Box
            borderBottom={false}
            borderColor="red"
            borderLeft
            borderRight={false}
            borderStyle="single"
            borderTop={false}
            paddingLeft={1}
          >
            <Display error={error.origin} level={level ? level++ : 1} />
          </Box>
        </Box>
      )}
    </Box>
  )
}

export const render = (error: BudError | Error | string) => {
  ink.render(<Error error={error} />)
}
