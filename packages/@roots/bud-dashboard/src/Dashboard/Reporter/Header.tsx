import {React, Box, Text, Spinner} from '@roots/bud-support'

/**
 * Displays pkg.name, current build status.
 */
export const Header = ({colors, progress, stats, pkg}) => (
  <Box flexDirection="row" marginTop={1} marginBottom={1}>
    <BuildIndicator
      colors={colors}
      progress={progress}
      stats={stats}
      pkg={pkg}
    />

    <BuildProgressMessage
      colors={colors}
      progress={progress}
      stats={stats}
    />
  </Box>
)

/**
 * Icon representing if compilation is happening
 */
const BuildIndicator = ({colors, progress, stats, pkg}) => (
  <Text backgroundColor={colors?.primary} color={colors?.white}>
    {' '}
    {progress?.message ? (
      <Spinner />
    ) : stats?.hash ? (
      '✓'
    ) : (
      ' '
    )}{' '}
    {pkg?.name}{' '}
  </Text>
)

/**
 * Current compilation output
 */
const BuildProgressMessage = ({progress, colors, stats}) => (
  <Text dimColor italic>
    {' '}
    {progress?.message ? (
      <Text italic color={colors?.subdued}>
        {progress?.message}
      </Text>
    ) : stats?.hash ? (
      <Text italic color={colors?.subdued}>
        {stats?.hash}
      </Text>
    ) : (
      <></>
    )}
  </Text>
)
