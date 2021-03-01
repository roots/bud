import {React, Box, Text} from '@roots/bud-support'
import {Assets} from '../../components/Assets'
import {Console} from '../../components/Console'
import {Module} from '../../components/Module'

/**
 * Body
 */
export const Body = ({
  bud,
  errors,
  hasErrors,
  warnings,
  hasWarnings,
  col,
  colors,
  stats,
  progress,
  bounds,
}) => (
  <Box flexDirection="column">
    <Module label="Assets">
      <Assets
        progress={progress}
        col={col}
        colors={colors}
        assets={stats?.assets}
      />
    </Module>

    {!hasErrors && (
      <Module label="Console">
        <Console bud={bud} progress={progress} />
      </Module>
    )}

    {hasErrors && errors && (
      <Module color={colors.error} label="Error">
        {errors?.map((err, id) => (
          <Text key={id}>{err}</Text>
        ))}
      </Module>
    )}

    {hasWarnings && warnings && (
      <Module color={colors.warning} label="Warning">
        {warnings?.map((err, id) => (
          <Text key={id}>{err}</Text>
        ))}
      </Module>
    )}
  </Box>
)
