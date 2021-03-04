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
  const server = bud.store.get('server')

  return isDevelopment ? (
    <Box flexDirection="row" justifyContent="space-between">
      <Box flexDirection="column">
        <Text>
          {`🧭  serve: `}
          {server.host}
          {`:`}
          {server.port}
        </Text>

        {server.proxy.enabled ? (
          <Text>
            {`🎯  proxy: `}
            {server.proxy.host}
            {`:`}
            {server.proxy.port}
          </Text>
        ) : (
          <Text dimColor>{`🎯  proxy: disabled`}</Text>
        )}

        {server.middleware.hot ? (
          <Text>{`🔥    hmr: enabled`}</Text>
        ) : (
          <Text dimColor>{`🔥    hmr: disabled`}</Text>
        )}
      </Box>

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
