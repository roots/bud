import React, {useEffect, FunctionComponent} from 'react'
import {useApp, useInput} from 'ink'
import useStdOutDimensions from 'ink-use-stdout-dimensions'

/**
 * Hooks
 */
import {useWebpack} from './hooks/useWebpack'
import {useFocusState} from './hooks/useFocusState'

/**
 * Dashboard components
 */
import {App} from './components/App'
import {Assets} from './components/Assets'
import {BrowserSync} from './components/BrowserSync'
import {Errors} from './components/Errors'
import {Warnings} from './components/Warnings'
import {DevServer} from './components/DevServer'

import type {Bud} from '@roots/bud'

interface DashboardProps {
  bud: Bud
}

type DashboardComponent = FunctionComponent<DashboardProps>

const Dashboard: DashboardComponent = ({bud}) => {
  const [width, height] = useStdOutDimensions()
  const [state, actions] = useFocusState()
  const build = useWebpack(bud)
  const {exit} = useApp()

  /**
   * Quits application when called.
   */
  const quit = () => {
    bud.logger.info({name: 'bud.compiler'}, 'Quitting application.')
    exit()

    bud.util.terminate()

    process.exit()
  }

  useInput(input => {
    if (input == 'q') {
      bud.logger.info(
        {name: 'bud.compiler', input},
        'User requested to close application.',
      )

      quit()
    }
  })

  /**
   * Run OS level notification when build complete
   */
  useEffect(() => {
    if (build?.success) {
      const title = bud.hooks.filter(
        'compiler.notify.success.title',
        'Build complete.',
      )
      bud.util.notify({title})
      bud.logger.info(
        {name: 'bud.compiler', title},
        'Build success notification',
      )
    }
  }, [build?.success])

  useEffect(() => {
    const notWatching =
      !bud.features.enabled('watch') && !bud.features.enabled('hot')

    if (notWatching && build?.done) {
      bud.logger.info(
        {
          name: 'bud.compiler',
          watch: bud.features.enabled('watch'),
          hot: bud.features.enabled('hot'),
          build: {
            ...build,
            assets: build.assets.map(asset => asset.name),
          },
        },
        'application determined to be finished based on state. quitting.',
      )

      quit()
    }
  })

  const showBrowserSync =
    !bud.features.enabled('debug') &&
    bud.features.enabled('browserSync')

  return (
    <App
      width={width}
      height={height}
      build={build}
      state={state}
      bud={bud}>
      <Assets actions={actions} build={build} />
      <Errors actions={actions} build={build} />
      <Warnings actions={actions} build={build} />
      {showBrowserSync && <BrowserSync actions={actions} />}
      <DevServer actions={actions} build={build} />
    </App>
  )
}

export {Dashboard}
