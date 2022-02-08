import {Theme, useStyle} from '@roots/ink-use-style'
import {Box} from 'ink'
import React from 'react'
import {StatsCompilation} from 'webpack'

import {Progress} from './progress'
import {Serve} from './serve'

/**
 * Dashboard display component
 *
 * @public
 */
export const Output = ({
  mode,
  stats,
  progress,
  style,
  proxy,
  url,
}: {
  mode: 'development' | 'production'
  stats: StatsCompilation
  progress: [number, string]
  style: Theme
  proxy: URL
  url: URL
}) => {
  const theme = useStyle(style)

  return (
    <Box flexDirection="column">
      <Box flexDirection="column" marginY={1}>
        <Progress progress={progress} theme={theme} />
      </Box>
      <Box flexDirection="column">
        {mode === 'development' && (
          <Serve theme={theme} proxy={proxy} url={url} />
        )}
      </Box>
    </Box>
  )
}
