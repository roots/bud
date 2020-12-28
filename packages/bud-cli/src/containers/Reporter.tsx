import {
  React,
  FunctionComponent,
  Box,
  Text,
  Spinner,
} from '@roots/bud-support'

import {Assets} from '../components/Assets'
import {Errors} from '../components/Errors'
import {Progress} from '../components/Progress'
import {Debug} from '../components/Debug'
import {Git} from '../components/Git'

import type {UseStats} from '../hooks/useStats'
import type {UseProgress} from '../hooks/useProgress'
import type {Styles} from '@roots/ink-use-style'
import type {Framework} from '@roots/bud-typings'

const Reporter: FunctionComponent<{
  bud: Framework
  stats: UseStats.Stats
  assets: Array<{
    name: string
    active: boolean
    size: number
    hot: boolean
    info?: string
  }>
  pkg: {[key: string]: any}
  progress: UseProgress.Progress
  errors?: string[]
  bounds: Styles['bounds']
  colors: Styles['colors']
  col: Styles['col']
}> = ({
  bud,
  stats,
  assets,
  progress,
  errors,
  pkg,
  bounds,
  col,
  colors,
}) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      height={bounds.height}
      alignItems="center"
      justifyContent="space-between">
      <Box flexDirection="column" justifyContent="space-between">
        <Box flexDirection="row" marginTop={1} marginBottom={1}>
          <Box flexDirection="row">
            <Text
              backgroundColor={colors.primary}
              color={colors.white}>
              {' '}
              {progress.msg ? (
                <Spinner />
              ) : stats?.hash ? (
                '✓'
              ) : (
                ''
              )}{' '}
              {pkg?.name}{' '}
            </Text>

            <Text dimColor color={colors.white} italic>
              {' '}
              {progress.msg ? (
                <Text italic color={colors.subdued}>
                  {progress.msg}
                </Text>
              ) : stats?.hash ? (
                <Text italic color={colors.subdued}>
                  {stats.hash}
                </Text>
              ) : (
                <></>
              )}
            </Text>
          </Box>
        </Box>

        <Box flexDirection="column">
          {(!errors || !errors[0]) && (
            <Box flexDirection="column" marginBottom={1}>
              <Assets assets={assets} />
            </Box>
          )}

          {errors && errors[0] && <Errors errors={errors} />}

          {stats?.warnings && stats?.warnings[0] && (
            <Errors errors={stats.warnings} />
          )}

          {stats?.time && (
            <>
              <Text>
                Compiled in{' '}
                <Text bold color={colors.success}>
                  {stats.time / 1000}s
                </Text>
              </Text>
            </>
          )}

          {bud.args.has('debug') && <Debug bud={bud} />}
        </Box>
      </Box>

      <Box flexDirection="column">
        <Progress
          progress={progress}
          colors={colors}
          bounds={bounds}
          col={col}
        />
        <Box
          marginTop={1}
          flexDirection="row"
          justifyContent="space-between">
          {bud.mode.is('development') && (
            <Text bold color={colors.accent}>
              {'🌐  '}
              {bud.server.config.get('ssl')
                ? 'https://'
                : 'http://'}
              {bud.server.config.get('host')}:
              {bud.server.config.get('port')}
            </Text>
          )}

          {bud.mode.is('development') && <Git />}
        </Box>
      </Box>
    </Box>
  )
}

export {Reporter}
