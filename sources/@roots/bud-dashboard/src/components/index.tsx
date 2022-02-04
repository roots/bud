import {Framework} from '@roots/bud-framework'
import {useStdin} from 'ink'
import React, {useEffect, useState} from 'react'
import {useEffectOnce, useUpdate} from 'react-use'
import {StatsCompilation} from 'webpack'

import {Input} from './input.component'
import {Output} from './output.component'

/**
 * Build display component
 *
 * @public
 */
export const Build = ({tap}: {tap: () => Framework}) => {
  const [app, setApp] = useState<Framework>(tap())

  const update = useUpdate()

  useEffectOnce(() => {
    setInterval(() => {
      if (app.isProduction && app.compiler.progress[0] >= 1) {
        setTimeout(app.close, 100)
      }

      setApp(tap())
      update()
    }, 36)
  })

  const {isRawModeSupported} = useStdin()
  isRawModeSupported && Input({app: app})

  const [stats, setStats] = useState<StatsCompilation>(null)

  useEffect(() => {
    app?.compiler?.stats && setStats(app.compiler.stats)
    update()
  }, [update, app])

  return (
    <Output
      mode={app?.mode}
      url={app?.store?.get('server.dev.url')}
      proxy={app?.store?.get('server.proxy.url')}
      stats={stats}
      progress={app?.compiler.progress ?? [0, 'Instantiating...']}
      style={app?.store.get('theme')}
    />
  )
}
