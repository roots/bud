import {
  React,
  FunctionComponent,
  Box,
  Text,
  Spinner,
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
 * Reporter interface
 */
declare interface ReporterInterface {
  bud: Framework
  pkg: {[key: string]: any}
  bounds: Styles['bounds']
  colors: Styles['colors']
  col: Styles['col']
  errors: Compilation['errors']
  stats: Webpack.Stats.ToJsonOutput
  progress: Compiler.Progress
}

/**
 * Reporter dashboard
 */
const Reporter: FunctionComponent<ReporterInterface> = ({
  bud,
  pkg,
  bounds,
  col,
  colors,
  errors,
  stats,
  progress,
}) => {
  return (
    <Box
      display="flex"
      width={bounds?.width}
      flexDirection="column">
      <Header
        colors={colors}
        stats={stats}
        pkg={pkg}
        progress={progress}
      />

      <Box
        height={
          !(errors?.length > 0) ? bounds?.height - 2 : null
        }
        justifyContent="space-between"
        display="flex"
        flexDirection="column">
        <Body
          errors={errors}
          bud={bud}
          col={col}
          colors={colors}
          stats={stats}
        />
        <Errors color={colors.error} errors={errors} />
        <Footer
          errors={errors}
          bud={bud}
          bounds={bounds}
          col={col}
          pkg={pkg}
          colors={colors}
          progress={progress}
          stats={stats}
        />
      </Box>
    </Box>
  )
}

/**
 * Displays pkg.name, current build status.
 */
const Header = ({colors, progress, stats, pkg}) => (
  <Box flexDirection="row" marginTop={1} marginBottom={1}>
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
)

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
 * Body components
 */
const Body = ({bud, errors, col, colors, stats}) => (
  <Box
    display={errors?.length > 0 ? 'none' : 'flex'}
    justifyContent="space-between"
    flexDirection="column">
    <Assets col={col} colors={colors} assets={stats?.assets} />

    <Errors color={colors.warning} errors={stats?.warnings} />

    <Console bud={bud.get()} />
  </Box>
)

/**
 * Footer components
 */
const Footer = props => (
  <Box
    display={props?.errors?.length > 0 ? 'none' : 'flex'}
    flexDirection="column">
    <DevelopmentFeatures {...props} />
    <Progress {...props} />
  </Box>
)

/**
 * Dev URL and Git statuses
 */
const DevelopmentFeatures = ({bud, stats, colors}) => {
  const isDevelopment = bud.isDevelopment
  const protocol = bud.store.get('server.ssl')
    ? 'https://'
    : 'http://'
  const host = bud.store.get('server.host')
  const port = bud.store.get('server.port')

  const devAddress = `🌐 ${protocol}${host}:${port}`

  return isDevelopment ? (
    <Box flexDirection="row" justifyContent="space-between">
      <Text dimColor>{devAddress}</Text>
      <Git colors={colors} />
    </Box>
  ) : (
    <Box
      marginTop={1}
      flexDirection="row"
      justifyContent="space-between"></Box>
  )
}

/* const Time = ({stats, colors}) =>
  stats?.time ? (
    <Box>
      <Text>
        Compiled in{' '}
        <Text bold color={colors.success}>
          {stats?.time / 1000}s
        </Text>
      </Text>
    </Box>
  ) : (
    <Box>
      <Text></Text>
    </Box>
  ) */

export {Reporter}
