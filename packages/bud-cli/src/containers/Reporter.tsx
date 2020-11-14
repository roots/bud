import React from 'react'
import {Box} from 'ink'

import Assets from '../components/Assets'
import Errors from '../components/Errors'
import {BuildInfo} from '../components/BuildInfo'
import Progress from '../components/Progress'
import Screen from '../components/Screen'
import Title from '../components/Title'
import {Nav} from '../components/Nav'
import {useStyle} from '@roots/ink-use-style'

import type {Bud} from '@roots/bud-typings'
import type {UseStats} from '../hooks/useStats'
import type {UseProgress} from '../hooks/useProgress'

declare namespace Reporter {
  export type Props = {
    bud: Bud.Contract
    stats: UseStats.Stats
    progress: UseProgress.Progress
  }

  export type Component = React.FunctionComponent<Props>
}

const Reporter: Reporter.Component = ({
  bud,
  stats,
  progress,
}) => {
  const {bounds, col} = useStyle()

  const displayName = bud.disk
    .get('project')
    .exists('package.json')
    ? (bud.disk.current.readJson('package.json') as {
        name: string
      }).name
    : 'Bud'

  return (
    <Box
      minHeight={bounds.height}
      paddingRight={1}
      justifyContent="space-between">
      <Screen title={bud.name}>
        <Box flexDirection="column">
          <Box flexDirection="column">
            <Title>{displayName}</Title>
            {bud.mode.is('development') && <Nav />}
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
        </Box>
      </Screen>
    </Box>
  )
}

export {Reporter}
