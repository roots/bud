import type {Bud} from '@roots/bud-framework'
import type ConsoleBuffer from '@roots/bud-framework/services/console'
import {Box, Static} from '@roots/bud-support/ink'
import React from '@roots/bud-support/react'
import type {StatsCompilation} from '@roots/bud-support/webpack'

import App from './app.js'
import {TTYApp} from './input.js'

interface Props {
  context: Bud['context']
  devUrl?: URL
  messages: ConsoleBuffer['messages']
  mode: Bud['mode']
  proxyUrl?: URL
  stats: StatsCompilation
  watchFiles?: Set<string>
}

export const dashboard = ({
  context,
  devUrl,
  messages,
  mode,
  proxyUrl,
  stats,
  watchFiles,
}: Props): React.ReactElement => {
  const compilations = stats?.children?.length
    ? [
        ...stats.children,
        ...(stats?.children?.flatMap(({children}) =>
          children.map(child => ({...child, isChild: true})),
        ) ?? []),
      ]
    : [stats]

  return (
    <Box flexDirection="column">
      {mode === `production` ? (
        <Static items={[0]}>
          {i => (
            <App
              key={i}
              compilations={compilations}
              mode={mode}
              context={context}
              displayAssets
              displayEntrypoints
              displayServerInfo={false}
              messages={messages}
            />
          )}
        </Static>
      ) : (
        <TTYApp
          App={App}
          compilations={compilations}
          isTTY={process.stdout.isTTY}
          mode={mode}
          devUrl={devUrl}
          proxyUrl={proxyUrl}
          watchFiles={watchFiles}
          context={context}
          messages={messages}
          displayAssets
          displayEntrypoints
          displayServerInfo
        />
      )}
    </Box>
  )
}
