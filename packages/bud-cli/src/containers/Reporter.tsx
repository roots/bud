import React from 'react'
import {Box} from 'ink'

import Assets from '../components/Assets'
import Errors from '../components/Errors'
import {BuildInfo} from '../components/BuildInfo'
import Progress from '../components/Progress'
import Screen from '../components/Screen'
import Title from '../components/Title'
import {Debug} from '../components/Debug'
import {useStyle} from '@roots/ink-use-style'

import type {Bud} from '@roots/bud-typings'
import type {UseStats} from '../hooks/useStats'
import type {UseProgress} from '../hooks/useProgress'

declare namespace Reporter {
  export type Props = {
    bud: Bud.Bud
    stats: UseStats.Stats
    progress: UseProgress.Progress
  }

  export type Component = React.FunctionComponent<Props>
}

const Reporter: Reporter.Component = ({
  bud: {disk, name, ...bud},
  stats,
  progress,
}) => {
  const {col} = useStyle()

  const displayName = disk.get('project').exists('package.json')
    ? (disk.current.readJson('package.json') as {
        name: string
      }).name
    : 'Bud'

  return (
    <Box paddingRight={1} justifyContent="space-between">
      <Screen title={name}>
        <Box flexDirection="column">
          <Box flexDirection="column">
            <Title>{displayName}</Title>
            {/* mode.is('development') && <Nav /> */}
          </Box>

          {stats?.errors && stats?.errors[0] && (
            <Errors errors={stats.errors} />
          )}

          {stats?.warnings && stats?.warnings[0] && (
            <Errors errors={stats.warnings} />
          )}

          <Box flexDirection="column">
            <Box
              width={col(12)}
              flexDirection="column"
              marginBottom={1}>
              <Assets assets={stats?.assets} />
            </Box>

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
