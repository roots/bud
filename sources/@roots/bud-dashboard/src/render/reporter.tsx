import type {Bud} from '@roots/bud-framework'
import {Box, render} from 'ink'
import React from 'react'
import type {StatsCompilation} from 'webpack'

import Compilation from './compilation/compilation.component.js'
import {Server} from './server.js'

export const renderResults = ({
  stats,
  app,
}: {
  stats: StatsCompilation
  app: Bud
}) => {
  render(
    <Box flexDirection="column" marginTop={1}>
      {stats?.children?.map((compilation, id) => (
        <Box key={id} flexDirection="column">
          <Compilation id={id} stats={compilation} />
        </Box>
      ))}

      {app.mode === 'development' && (
        <Box>
          <Server app={app} />
        </Box>
      )}
    </Box>,
  )
}
