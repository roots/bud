import type {Bud} from '@roots/bud-framework'
import {Box, render, Text} from 'ink'
import React from 'react'
import type {StatsCompilation} from 'webpack'

import Compilation from './compilation/compilation.component.js'
import {color} from './format.js'
import {Server} from './server.js'

export const renderResults = ({
  stats,
  app,
}: {
  stats: StatsCompilation
  app: Bud
}) => {
  const compilations = (
    stats?.children?.length ? [stats, ...stats?.children] : [stats]
  ).filter(
    stats =>
      stats?.namedChunkGroups &&
      Object.values(stats?.namedChunkGroups).length > 0,
  )

  render(
    <Box flexDirection="column">
      <Box marginBottom={1}>
        <Text bold color={color.cyan}>
          {app.label}
        </Text>
      </Box>

      {compilations.map((compilation, id) => (
        <Box key={id} flexDirection="column">
          <Compilation id={id} stats={compilation} />
        </Box>
      ))}

      {app.mode === 'development' && <Server app={app} />}
    </Box>,
  )
}
