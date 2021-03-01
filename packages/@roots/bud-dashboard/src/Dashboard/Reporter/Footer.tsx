import {React, Box, Text, Spacer} from '@roots/bud-support'
import {Git} from '../../components/Git'

/**
 * Footer components
 */
export const Footer = props => {
  return (
    <Box flexDirection="column">
      <DevelopmentFeatures {...props} />
    </Box>
  )
}

/**
 * Dev URL and Git statuses
 */
export const DevelopmentFeatures = ({bud, colors}) => {
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
    <Box flexDirection="row" justifyContent="space-between">
      <Spacer />
    </Box>
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
