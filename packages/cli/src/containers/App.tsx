import React, {FunctionComponent} from 'react'
import {Box} from 'ink'

import Assets from '../components/Assets'
import Errors from '../components/Errors'
import BuildInfo from '../components/BuildInfo'
import Progress from '../components/Progress'
import Screen from '../components/Screen'
import Prettier from '../components/Prettier'

import useCtx from '../hooks/useAppStyles'

const App: FunctionComponent<{
  bud: Framework.Bud
  stats: Compilation.Stats
  progress: Compilation.Progress
  errors: Compilation.Stats.Errors
  warnings: Compilation.Stats.Warnings
}> = ({bud, stats, progress, errors}) => {
  const {dimensions, col, ctx} = useCtx()

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
          {errors?.length > 0 && (
            <Box flexDirection="column" marginBottom={1}>
              <Errors errors={errors} />
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

          <Box flexDirection="column" marginBottom={1}>
            <Prettier parser="babel">
              {`console.log(${JSON.stringify(
                bud.build.make(),
              )})`}
            </Prettier>
          </Box>
        </Box>
      </Screen>
    </Box>
  )
}

export {App as default}
