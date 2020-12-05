import React from 'react'
import {Box} from 'ink'
import {useStyle} from '@roots/ink-use-style'

import Assets from '../components/Assets'
import Errors from '../components/Errors'
import {BuildInfo} from '../components/BuildInfo'
import Progress from '../components/Progress'
import Screen from '../components/Screen'
import {Debug} from '../components/Debug'

import type {Bud} from '@roots/bud-typings'
import type {UseStats} from '../hooks/useStats'
import type {UseProgress} from '../hooks/useProgress'
import {usePackageJson} from '../hooks/usePackageJson'

declare namespace Reporter {
  export type Props = {
    bud: Bud.Bud
    stats: UseStats.Stats
    progress: UseProgress.Progress
    errors?: string[]
  }

  export type Component = React.FunctionComponent<Props>
}

const Reporter: Reporter.Component = ({
  bud,
  stats,
  progress,
  errors,
}) => {
  const pkg = usePackageJson(bud)
  const {col} = useStyle()

  return (
    <Box paddingRight={1} justifyContent="space-between">
      <Screen title={pkg.name}>
        <Box flexDirection="column">
          <Box flexDirection="column">
            {(!errors || !errors[0]) && (
              <Box
                width={col(12)}
                flexDirection="column"
                marginBottom={1}>
                <Assets assets={stats?.assets} />
              </Box>
            )}

            {errors && errors[0] && <Errors errors={errors} />}

            {stats?.warnings && stats?.warnings[0] && (
              <Errors errors={stats.warnings} />
            )}

            <Box
              width={col(12)}
              flexDirection="column"
              marginBottom={1}>
              <Progress {...progress} />
            </Box>
          </Box>

          <Box flexDirection="column" marginBottom={1}>
            <BuildInfo stats={stats} />
          </Box>

          {bud.args.has('debug') && <Debug bud={bud} />}
        </Box>
      </Screen>
    </Box>
  )
}

export {Reporter}
