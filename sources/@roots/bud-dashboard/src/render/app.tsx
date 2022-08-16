import type {Bud} from '@roots/bud-framework'
import {Box, Text} from 'ink'
import React from 'react'
import type {StatsCompilation} from 'webpack'

import Compilation from './compilation/compilation.component.js'
import {color} from './format.js'
import {Server} from './server.js'

const App = ({
  app,
  compilations,
}: {
  app: Bud
  compilations: Array<StatsCompilation>
}) => (
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
  </Box>
)

export default App
