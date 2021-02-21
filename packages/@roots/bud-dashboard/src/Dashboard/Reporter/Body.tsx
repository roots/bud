import {React, Box} from '@roots/bud-support'

import {Assets} from '../../components/Assets'
import {Errors} from '../../components/Errors'
import {Console} from '../../components/Console'

/**
 * Body components
 */
export const Body = ({bud, errors, col, colors, stats}) => (
  <Box
    display={errors?.length > 0 ? 'none' : 'flex'}
    justifyContent="space-between"
    flexDirection="column">
    <Assets col={col} colors={colors} assets={stats?.assets} />

    <Errors color={colors.warning} errors={stats?.warnings} />

    <Console bud={bud.get()} />
  </Box>
)
