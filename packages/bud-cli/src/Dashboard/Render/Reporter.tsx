import {
  React,
  FunctionComponent,
  Box,
  Text,
  Spinner,
  isString,
} from '@roots/bud-support'
import type {
  Webpack,
  Framework,
  Compiler,
} from '@roots/bud-typings'
import type {Styles} from '@roots/ink-use-style'

import {Assets} from './components/Assets'
import {Errors} from './components/Errors'
import {Progress} from './components/Progress'
import {Git} from './components/Git'
import {Console} from './components/Console'

import {Compilation} from '../../hooks/useCompilation'

/**
 * Main dashboard component
 */
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
}) => {
  const showErr =
    errors && (errors?.length > 0 || isString(errors))

  const showWarn = stats?.warnings && stats?.warnings[0]

  return (
    <Box
      display="flex"
      flexDirection="column"
      height={bounds?.height}
      alignItems="center"
      justifyContent="space-between">
      <Box flexDirection="column" justifyContent="space-between">
        <Box flexDirection="row" marginTop={1} marginBottom={1}>
          <Box flexDirection="row">
            <BuildIndicator
              colors={colors}
              progress={progress}
              stats={stats}
              pkg={pkg}
            />
            <BuildProgressMessage
              colors={colors}
              progress={progress}
              stats={stats}
            />
          </Box>
        </Box>

        <Box flexDirection="column" marginBottom={1}>
          <Assets
            col={col}
            colors={colors}
            assets={stats?.assets}
          />
        </Box>

        {showErr && (
          <Errors color={colors.error} errors={errors} />
        )}

        {showWarn && (
          <Errors
            color={colors.warning}
            errors={stats?.warnings}
          />
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
          <Text>
            Compiled in{' '}
            <Text bold color={colors.success}>
              {stats?.time / 1000}s
            </Text>
          </Text>
        )}
      </Box>

      <Box flexDirection="column">
        <Progress
          progress={progress}
          colors={colors}
          bounds={bounds}
          col={col}
        />

        <DevelopmentFeatures
          isDevelopment={bud.isDevelopment}
          protocol={
            bud.store.get('server.ssl') ? 'https://' : 'http://'
          }
          host={bud.store.get('server.host')}
          port={bud.store.get('server.port')}
          colors={colors}
        />
      </Box>
    </Box>
  )
}

/**
 * Icon representing if compilation is happening
 */
const BuildIndicator = ({colors, progress, stats, pkg}) => (
  <Text backgroundColor={colors?.primary} color={colors?.white}>
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
)

/**
 * Current compilation output
 */
const BuildProgressMessage = ({progress, colors, stats}) => (
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
)

/**
 * Dev URL and Git statuses
 */
const DevelopmentFeatures = ({
  protocol,
  host,
  port,
  isDevelopment,
  colors,
}) =>
  isDevelopment ? (
    <Box
      marginTop={1}
      flexDirection="row"
      justifyContent="space-between">
      <Text bold color={colors.accent}>
        {`🌐 ${protocol}${host}${port}`}
      </Text>

      <Git />
    </Box>
  ) : (
    <Box marginTop={1}></Box>
  )

export {Reporter}
