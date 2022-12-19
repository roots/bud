import {Box, Text} from '@roots/bud-support/ink'
import React from '@roots/bud-support/react'

import Compilation from './compilation/compilation.component.js'
import type {Props} from './index.js'
import {Server} from './server/index.js'

const App = ({
  compilations,
  context,
  devUrl,
  proxyUrl,
  displayServerInfo,
  displayAssets,
  displayEntrypoints,
  mode,
  watchFiles = new Set(),
}: Props) => {
  if (!compilations.length)
    return (
      <Box flexDirection="column">
        <Text>No compilations</Text>
      </Box>
    )

  return (
    <Box flexDirection="column">
      {compilations.map((compilation, id) => (
        <Box key={id} flexDirection="column" paddingY={1}>
          <Compilation
            id={id}
            mode={mode}
            compilation={compilation}
            context={context}
            compilerCount={compilations.length}
            displayAssets={displayAssets}
            displayEntrypoints={displayEntrypoints}
          />
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
