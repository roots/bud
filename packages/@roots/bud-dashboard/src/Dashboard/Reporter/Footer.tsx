import {React, Box, Text} from '@roots/bud-support'
import {Progress} from '../../components/Progress'
import {Git} from '../../components/Git'

/**
 * Footer components
 */
export const Footer = props => {
  const {progress, bounds, hasErrors} = props
  const showProgress = progress && bounds && !hasErrors

  return showProgress ? (
    <Box flexDirection="column">
      <Progress {...props} />
    </Box>
  ) : null
}

/**
 * Dev URL and Git statuses
 */
export const DevelopmentFeatures = ({bud, stats, colors}) => {
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
