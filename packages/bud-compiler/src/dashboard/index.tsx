import React, {useEffect, FunctionComponent} from 'react'
import {useInput} from 'ink'
import useStdOutDimensions from 'ink-use-stdout-dimensions'

import {useWebpack} from './hooks/useWebpack'
import {Configuration as WebpackConfig} from 'webpack'
import {App} from './components/App'
import {Artifact} from './components/Artifact'
import type {Bud} from '@roots/bud'

interface DashboardProps {
  bud: Bud
  config: WebpackConfig
}

type DashboardComponent = FunctionComponent<DashboardProps>

const quit = bud => {
  bud.util.terminate()

  process.exit()
}

const Dashboard: DashboardComponent = ({bud, config}) => {
  const [width, height] = useStdOutDimensions()
  const build = useWebpack(bud)

  useInput(input => {
    input == 'q' && quit(bud)
  })

  useEffect(() => {
    if (
      build?.assets.length > 0 &&
      build?.errors.length == 0 &&
      build?.percentage == 1
    ) {
      const title = bud.hooks.filter(
        'compiler.notify.success.title',
        'Build complete.',
      )

      bud.util.notify({title})
    }
  }, [build])

  return bud.features.enabled('dev') ? (
    <App
      config={config}
      bud={bud}
      width={width}
      height={height}
      build={build}
    />
  ) : (
    <Artifact width={width} build={build} />
  )
}

export {Dashboard as default}
