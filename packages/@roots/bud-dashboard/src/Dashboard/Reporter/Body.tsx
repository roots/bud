import {React, Box, Text} from '@roots/bud-support'

import {Assets} from '../../components/Assets'
import {Errors} from '../../components/Errors'
import {Console} from '../../components/Console'

/**
 * Body components
 */
export const Body = ({bud, errors, col, colors, stats}) => (
  <Box
    display={errors?.length > 0 ? 'none' : 'flex'}
    flexDirection="column">
    <Module label="Assets">
      <Assets col={col} colors={colors} assets={stats?.assets} />
    </Module>

    <Module label="Warnings" when={stats?.warnings?.length > 0}>
      <Errors color={colors.warning} errors={stats?.warnings} />
    </Module>

    <Module label="Console">
      <Console bud={bud.get()} />
    </Module>
  </Box>
)

export const Module = ({
  children,
  label,
  when = true,
  fallback = null,
}) =>
  when ? (
    <Box flexDirection="column">
      <Box marginX={1} flexDirection="column">
        <Text>{label}</Text>
      </Box>
      <Box flexDirection="column">{children}</Box>
    </Box>
  ) : (
    fallback
  )
