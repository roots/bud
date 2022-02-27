import {Framework} from '@roots/bud-framework'
import {useStdin} from 'ink'
import React, {useEffect} from 'react'
import {useInterval, useUpdate} from 'react-use'

import {Input} from './input.component'
import {Output} from './output.component'

/**
 * Build display component
 *
 * @public
 */
export const Build = ({tap}: {tap: () => Framework}) => {
  const {isRawModeSupported} = useStdin()
  isRawModeSupported && Input({app: tap()})

  const update = useUpdate()
  useInterval(update, 10)

  useEffect(() => {
    tap().isProduction &&
      tap().compiler.progress &&
      tap().compiler.progress[0] &&
      tap().compiler.progress[0] === 1 &&
      setTimeout(tap().close, 100)
  })

  return tap().compiler.stats?.hash ? (
    <Output
      mode={tap().mode}
      url={tap().store.get('server.dev.url')}
      proxy={tap().store.get('server.proxy.url')}
      middleware={tap().store.get('server.middleware')}
      progress={tap().compiler.progress}
      style={tap().store.get('theme')}
    />
  ) : null
}
