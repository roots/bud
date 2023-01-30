import Ink from '@roots/bud-support/ink'
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
  externalDevUrl,
  mode,
  watchFiles = new Set(),
}: Props) => {
  if (!compilations.length)
    return (
      <Ink.Box flexDirection="column">
        <Ink.Text>No compilations</Ink.Text>
      </Ink.Box>
    )

  return (
    <Ink.Box flexDirection="column">
      {compilations.map((compilation, id) => (
        <Ink.Box key={id} flexDirection="column" paddingY={1}>
          <Compilation
            compilation={compilation}
            context={context}
            displayAssets={displayAssets}
            displayEntrypoints={displayEntrypoints}
          />
        </Ink.Box>
      ))}

      {mode === `development` ? (
        <Server
          devUrl={devUrl}
          externalDevUrl={externalDevUrl}
          proxyUrl={proxyUrl}
          watchFiles={watchFiles}
          displayServerInfo={displayServerInfo}
        />
      ) : null}
    </Ink.Box>
  )
}

export default App
