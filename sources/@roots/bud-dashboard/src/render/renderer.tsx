import type {Bud} from '@roots/bud-framework'
import {Instance, render, Static} from 'ink'
import React from 'react'
import type {StatsCompilation} from 'webpack'

import App from './app.js'
import {TTYApp} from './input.js'

export const renderDashboard = ({
  stats,
  app,
}: {
  stats: StatsCompilation
  app: Bud
}): Instance => {
  const compilations = (
    stats?.children?.length ? [stats, ...stats?.children] : [stats]
  ).filter(
    stats =>
      stats?.namedChunkGroups &&
      Object.values(stats?.namedChunkGroups).length > 0,
  )

  return render(
    app.isProduction ? (
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
    ),
  )
}
