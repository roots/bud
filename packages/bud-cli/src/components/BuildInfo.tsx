import React, {FunctionComponent} from 'react'
import {Box, Text, Spacer} from 'ink'
import {useStyle} from '@roots/ink-use-style'
import type {UseStats} from '../hooks/useStats'

declare namespace BuildInfo {
  interface InfoProps {
    stats: UseStats.Stats
  }

  type Component = FunctionComponent<InfoProps>
}

const BuildInfo: BuildInfo.Component = ({stats}) => {
  const {col, ctx} = useStyle()

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

export {BuildInfo}
