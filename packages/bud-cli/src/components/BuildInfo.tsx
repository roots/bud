import React, {FunctionComponent} from 'react'
import {Box, Text} from 'ink'
import {useStyle} from '@roots/ink-use-style'
import type {UseStats} from '../hooks/useStats'

declare namespace BuildInfo {
  interface InfoProps {
    stats: UseStats.Stats
  }

  type Component = FunctionComponent<InfoProps>
}

const BuildInfo: BuildInfo.Component = ({stats}) => {
  const {col, ctx, colors} = useStyle()

  return (
    <Box
      flexDirection={ctx(['column', 'row'])}
      width={col(12)}
      justifyContent="flex-start">
      {stats?.hash && (
        <>
          <Text bold color={colors.success}>
            ✓{' '}
          </Text>
          <Text bold color={colors.white} italic>
            Build ID {stats.hash}
          </Text>
        </>
      )}
    </Box>
  )
}

export {BuildInfo}
