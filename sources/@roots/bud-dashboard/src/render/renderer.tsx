import type {Bud} from '@roots/bud-framework'
import {Box, render, Static} from '@roots/bud-support/ink'
import React from '@roots/bud-support/react'
import type {StatsCompilation} from 'webpack'

import App from './app.js'
import {TTYApp} from './input.js'

interface Props {
  stats: StatsCompilation
  mode: Bud['mode']
  context: Bud['context']
  devUrl?: URL
  proxyUrl?: URL
  watchFiles?: Set<string>
}

export const renderDashboard = ({
  stats,
  mode,
  context,
  devUrl,
  proxyUrl,
  watchFiles,
}: Props) => {
  const compilations = stats?.children?.length
    ? [
        ...stats.children,
        ...(stats?.children?.flatMap(({children}) =>
          children.map(child => ({...child, isChild: true})),
        ) ?? []),
      ]
    : [stats]

  return render(
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
            />
          )}
        </Static>
      ) : process.stdout.isTTY ? (
        <TTYApp
          App={App}
          compilations={compilations}
          isTTY={true}
          mode={mode}
          devUrl={devUrl}
          proxyUrl={proxyUrl}
          watchFiles={watchFiles}
          context={context}
          displayAssets
          displayEntrypoints
          displayServerInfo
        />
      ) : (
        <App
          compilations={compilations}
          isTTY={false}
          mode={mode}
          devUrl={devUrl}
          proxyUrl={proxyUrl}
          watchFiles={watchFiles}
          context={context}
          displayAssets
          displayEntrypoints
          displayServerInfo
        />
      )}
    </Box>,
  )
}
