import type {Bud} from '@roots/bud-framework'
import type ConsoleBufferService from '@roots/bud-framework/services/console'
import {Box} from '@roots/bud-support/ink'
import React from '@roots/bud-support/react'
import type {StatsCompilation} from '@roots/bud-support/webpack'

import Compilation from './compilation/compilation.component.js'
import {Log} from './consoleBuffer/log.js'
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
  messages?: ConsoleBufferService['messages']
}

const App = ({
  compilations,
  context,
  devUrl,
  proxyUrl,
  displayServerInfo = true,
  displayAssets = true,
  displayEntrypoints = true,
  messages,
  mode,
  watchFiles = new Set(),
}: Props) => {
  return (
    <Box flexDirection="column">
      <Log messages={messages} />

      {compilations.map((compilation, id) => (
        <Box
          key={id}
          flexDirection="column"
          paddingBottom={compilations?.length > 1 ? 1 : 0}
        >
          <Compilation
            id={id}
            mode={mode}
            stats={compilation}
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