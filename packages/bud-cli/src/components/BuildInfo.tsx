import React, {FunctionComponent} from 'react'
import {Box, Text, Spacer} from 'ink'
import {Stats} from 'webpack'

import useAppStyles from '../hooks/useAppStyles'

interface InfoProps {
  stats: Stats.ToJsonOutput
}

const BuildInfo: FunctionComponent<InfoProps> = ({stats}) => {
  const {col, ctx} = useAppStyles()

  return (
    <Box
      flexDirection={ctx(['column', 'row'])}
      width={col(12)}
      justifyContent="space-between">
      {stats?.time && (
        <Text bold color="white">
          Finished {stats.errors.length > 0 && 'with errors '}in{' '}
          {stats.time / 1000}s
        </Text>
      )}

      <Spacer />

      {stats?.hash && (
        <Text color="#6C758F">Build {stats.hash}</Text>
      )}
    </Box>
  )
}

export {BuildInfo as default}
