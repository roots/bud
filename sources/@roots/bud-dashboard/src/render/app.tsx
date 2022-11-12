import type {Bud} from '@roots/bud-framework'
import {Box, Text} from '@roots/bud-support/ink'
import React from '@roots/bud-support/react'
import type {StatsCompilation} from '@roots/bud-support/webpack'

import Compilation from './compilation/compilation.component.js'
import {Server} from './server/index.js'

interface Props {
  context: Bud['context']
  devUrl?: URL
  proxyUrl?: URL
  watchFiles?: Set<string>
  mode: Bud['mode']
  compilations: Array<StatsCompilation>
  isTTY?: boolean
  displayServerInfo?: boolean
  displayAssets?: boolean
  displayEntrypoints?: boolean
}

const App = ({
  compilations,
  context,
  devUrl,
  proxyUrl,
  displayServerInfo = true,
  displayAssets = true,
  displayEntrypoints = true,
  mode,
  watchFiles = new Set(),
}: Props) => {
  return (
    <Box flexDirection="column">
      {compilations.map((compilation, id) => (
        <Box key={id} flexDirection="column">
          <Box>
            <Text>{` `}</Text>
          </Box>
          <Compilation
            id={id}
            mode={mode}
            stats={compilation}
            context={context}
            compilerCount={compilations.length}
            displayAssets={displayAssets}
            displayEntrypoints={displayEntrypoints}
          />
          <Box>
            <Text>{` `}</Text>
          </Box>
        </Box>
      ))}

      {mode === `development` ? (
        <Server
          devUrl={devUrl}
          proxyUrl={proxyUrl}
          watchFiles={watchFiles}
          displayServerInfo={displayServerInfo}
        />
      ) : null}
    </Box>
  )
}

export default App
