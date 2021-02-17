import {
  React,
  FunctionComponent,
  Box,
  Text,
  Spinner,
  isArray,
  isString,
} from '@roots/bud-support'

import {Assets} from '../components/Assets'
import {Errors} from '../components/Errors'
import {Progress} from '../components/Progress'
import {Git} from '../components/Git'
import {Console} from '../components/Console'

import type {Styles} from '@roots/ink-use-style'
import type {
  Webpack,
  Framework,
  Compiler,
} from '@roots/bud-typings'
import {Compilation} from '../hooks/useCompilation'

const Reporter: FunctionComponent<{
  bud: Framework
  pkg: {[key: string]: any}
  bounds: Styles['bounds']
  colors: Styles['colors']
  col: Styles['col']
  stats: Webpack.Stats.ToJsonOutput
  progress: Compiler.Progress
  errors: Compilation['errors']
}> = ({
  bud,
  pkg,
  bounds,
  col,
  colors,
  errors,
  stats,
  progress,
}) => (
  <Box
    display="flex"
    flexDirection="column"
    height={bounds?.height}
    alignItems="center"
    justifyContent="space-between">
    <Box flexDirection="column" justifyContent="space-between">
      <Box flexDirection="row" marginTop={1} marginBottom={1}>
        <Box flexDirection="row">
          <Text
            backgroundColor={colors?.primary}
            color={colors?.white}>
            {' '}
            {progress?.message ? (
              <Spinner />
            ) : stats?.hash ? (
              '✓'
            ) : (
              ' '
            )}{' '}
            {pkg?.name}{' '}
          </Text>

          <Text dimColor italic>
            {' '}
            {progress?.message ? (
              <Text italic color={colors?.subdued}>
                {progress?.message}
              </Text>
            ) : stats?.hash ? (
              <Text italic color={colors?.subdued}>
                {stats?.hash}
              </Text>
            ) : (
              <></>
            )}
          </Text>
        </Box>
      </Box>

      <Box flexDirection="column">
        <Box flexDirection="column" marginBottom={1}>
          <Assets assets={stats?.assets} />
        </Box>

        {(isArray(errors) && errors.length > 0) ||
          (isString(errors) && <Errors errors={errors} />)}

        {stats?.warnings && stats?.warnings[0] && (
          <Errors errors={stats?.warnings} />
        )}

        <Box flexDirection="column">
          <Box
            flexDirection="column"
            marginBottom={1}
            marginLeft={1}
            marginRight={1}>
            <Console bud={bud.get()} />
          </Box>
        </Box>

        {stats?.time && (
          <>
            <Text>
              Compiled in{' '}
              <Text bold color={colors.success}>
                {stats?.time / 1000}s
              </Text>
            </Text>
          </>
        )}
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
        {bud.isDevelopment && (
          <>
            <Text bold color={colors.accent}>
              {'🌐 '}
              {bud.store.get('server.ssl')
                ? 'https://'
                : 'http://'}
              {bud.store.get('server.host')}:
              {bud.store.get('server.port')}
            </Text>

            <Git />
          </>
        )}
      </Box>
    </Box>
  </Box>
)

export {Reporter}
