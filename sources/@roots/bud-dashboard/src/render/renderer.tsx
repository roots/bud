import type {Bud} from '@roots/bud-framework'
import {Box, render, Static} from '@roots/bud-support/ink'
import React from '@roots/bud-support/react'
import type {StatsCompilation} from 'webpack'

import App from './app.js'
import {TTYApp} from './input.js'

interface Props {
  stats: StatsCompilation
  app: Bud
}

export const renderDashboard = ({stats, app}: Props) => {
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
      {app.isProduction ? (
        <Static items={[0]}>
          {i => <App key={i} compilations={compilations} app={app} />}
        </Static>
      ) : process.stdout.isTTY ? (
        <TTYApp App={App} app={app} compilations={compilations} />
      ) : (
        <App
          app={app}
          compilations={compilations}
          isTTY={false}
          displayAssets
          displayEntrypoints
          displayServerInfo
        />
      )}
    </Box>,
  )
}
