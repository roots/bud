import React, {useEffect, FunctionComponent} from 'react'
import {useApp, useInput} from 'ink'
import useStdOutDimensions from 'ink-use-stdout-dimensions'
import fs from 'fs-extra'

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

  const quit = () => {
    bud.util.terminate()
    process.exit()
  }
  useInput(input => {
    if (input == 'q') {
      quit()
    }
  })

  useEffect(() => {
    if (build?.success) {
      const title = bud.hooks.filter(
        'compiler.notify.success.title',
        'Build complete.',
      )
      bud.util.notify({title})
    }
  }, [build?.success])

  useEffect(() => {
    const notWatching =
      !bud.features.enabled('watch') && !bud.features.enabled('hot')

    if (notWatching && build?.done) {
      quit()
    }
  })

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
      <DevServer actions={actions} bud={bud} build={build} />
    </App>
  )
}

export {Dashboard}
