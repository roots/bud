import React, {FunctionComponent} from 'react'
import {Box} from 'ink'

import Assets from '../components/Assets'
import Errors from '../components/Errors'
import BuildInfo from '../components/BuildInfo'
import Progress from '../components/Progress'
import Screen from '../components/Screen'
import Title from '../components/Title'
import {Nav} from '../components/Nav'

import useCtx from '../hooks/useAppStyles'

const App: FunctionComponent<{
  bud: Framework.Bud
  stats: Compilation.Stats
  progress: Compilation.Progress
  errors: Compilation.Stats.Errors
  warnings: Compilation.Stats.Warnings
}> = ({bud, stats, progress, errors, warnings}) => {
  const {dimensions, col, ctx} = useCtx()

  const displayName = bud.disk
    .get('project')
    .exists('package.json')
    ? (bud.disk.current.readJson('package.json') as {
        name: string
      }).name
    : 'Bud'

  return (
    <Box
      width={ctx([col(12)])}
      minHeight={dimensions.height}
      paddingRight={1}
      paddingBottom={2}
      paddingTop={1}
      justifyContent="space-between">
      <Screen title={bud.name}>
        <Box flexDirection="column">
          <Box flexDirection="column" marginBottom={1}>
            <Title>{displayName}</Title>
            <Nav />
          </Box>

          {errors && (
            <Box flexDirection="column" marginBottom={1}>
              <Errors errors={errors} />
            </Box>
          )}

          {warnings && (
            <Box flexDirection="column" marginBottom={1}>
              <Errors errors={warnings} />
            </Box>
          )}

          <>
            <Box flexDirection="column" marginBottom={1}>
              <Assets assets={stats?.assets} />
            </Box>

            <Box flexDirection="column" marginBottom={1}>
              <Progress progress={progress} />
            </Box>
          </>

          <Box flexDirection="column" marginBottom={1}>
            <BuildInfo stats={stats} />
          </Box>
        </Box>
      </Screen>
    </Box>
  )
}

export {App as default}
