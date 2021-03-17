import {
  React,
  Box,
  Text,
  Spacer,
  useEffect,
  useState,
  Spinner,
} from '@roots/bud-support'
import axios from 'axios'
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
  const [proxyAlive, setProxyAlive] = useState(null)
  const [serverAlive, setServerAlive] = useState(null)
  const server = bud.server.config

  useEffect(() => {
    setInterval(
      checkStatus(
        server.get('middleware.proxy'),
        server.get('proxy.host'),
        server.get('proxy.port'),
        setProxyAlive,
      ),
      5000,
    )

    setInterval(
      checkStatus(
        server.get('middleware.dev'),
        server.get('host'),
        server.get('port'),
        setServerAlive,
      ),
      5000,
    )
  }, [server])

  return isDevelopment ? (
    <Box flexDirection="row" justifyContent="space-between">
      <Box flexDirection="column">
        <Status
          label={'SERVE'}
          status={serverAlive}
          colors={colors}
          enabled={server.get('middleware.dev')}
          host={server.get('host')}
          port={server.get('port')}
        />
        <Status
          label={'PROXY'}
          status={proxyAlive}
          colors={colors}
          enabled={server.get('middleware.proxy')}
          host={server.get('proxy.host')}
          port={server.get('proxy.port')}
        />

        {server.enabled('middleware.hot') ? (
          <Text>{`HMR:   enabled`}</Text>
        ) : (
          <Text dimColor>{`HMR:   disabled`}</Text>
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

/**
 * Report status code.
 */
const Status = ({
  enabled,
  host,
  port,
  status,
  label,
  colors,
}) => {
  const statusColor = resCode => {
    switch (resCode) {
      case 200:
        return colors.success
      case 300:
        return colors.warning
      case 400:
        return colors.warning
      case 500:
        return colors.error
      default:
        return colors.faded
    }
  }

  return enabled ? (
    <Text>
      {`${label}: ${host}:${port}`}
      {status ? (
        <Text color={statusColor(status)}> [{status}]</Text>
      ) : (
        <Text color={statusColor(status)}>
          {' '}
          <Spinner />
        </Text>
      )}
    </Text>
  ) : (
    <Text dimColor>{`${label}: disabled`}</Text>
  )
}

/**
 * Request server/proxy resources
 */
const checkStatus = (
  enabled: boolean,
  host: string,
  port: number,
  update: CallableFunction,
) => {
  return async () => {
    if (!enabled) return

    try {
      const res = await axios(`http://${host}:${port}`, {
        method: 'GET',
      })

      update(res.status)
    } catch (err) {}
  }
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
