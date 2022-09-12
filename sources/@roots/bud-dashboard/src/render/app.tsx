import type {Bud} from '@roots/bud-framework'
import {Box, Text} from 'ink'
import React from 'react'
import type {StatsCompilation} from 'webpack'

import Compilation from './compilation/compilation.component.js'
import {Server} from './server.js'

const App = ({
  app,
  compilations,
  isTTY = true,
  displayServerInfo = true,
  displayAssets = true,
  displayEntrypoints = true,
}: {
  app: Bud
  compilations: Array<StatsCompilation>
  isTTY?: boolean
  displayServerInfo?: boolean
  displayAssets?: boolean
  displayEntrypoints?: boolean
}) => {
  return (
    <Box flexDirection="column">
      {compilations.map((compilation, id) => (
        <Box key={id} flexDirection="column">
          <Box>
            <Text>{` `}</Text>
          </Box>
          <Compilation
            id={id}
            mode={app.mode}
            stats={compilation}
            context={app.context}
            compilerCount={compilations.length}
            displayAssets={displayAssets}
            displayEntrypoints={displayEntrypoints}
          />
          <Box>
            <Text>{` `}</Text>
          </Box>
        </Box>
      ))}

      {app.isDevelopment ? (
        <Server app={app} displayServerInfo={displayServerInfo} />
      ) : null}
    </Box>
  )
}

export default App
