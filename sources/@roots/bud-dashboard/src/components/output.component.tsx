import {Theme, useStyle} from '@roots/ink-use-style'
import {Box} from 'ink'
import React from 'react'

import {Serve} from './serve'

/**
 * Dashboard display component
 *
 * @public
 */
export const Output = ({
  mode,
  progress,
  style,
  proxy,
  url,
  middleware,
}: {
  mode: 'development' | 'production'
  progress: [number, string]
  style: Theme
  proxy: URL
  url: URL
  middleware: Record<string, boolean>
}) => {
  const theme = useStyle(style)

  return (
    <Box flexDirection="column">
      {mode === 'development' && (
        <Serve
          theme={theme}
          middleware={middleware}
          proxy={proxy}
          url={url}
        />
      )}
    </Box>
  )
}
