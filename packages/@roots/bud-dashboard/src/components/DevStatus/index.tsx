import React, {useEffect, useState} from 'react'
import {Box, Text, Spacer} from 'ink'
import Spinner from 'ink-spinner'
import {checkStatus} from './checkStatus'
import {Dashboard} from '@roots/bud-framework'

/**
 * Development server
 */
export const DevStatus: React.FunctionComponent<Dashboard.AppProps> = props => {
  const isDevelopment = props.bud.isDevelopment
  const [proxyStatus, setProxyStatus] = useState(null)
  const [serverStatus, setServerStatus] = useState(null)
  const server = props.bud.server.config.all()

  useEffect(() => {
    server.middleware.proxy
      ? (async () => {
          setInterval(
            async () =>
              await checkStatus(
                server.middleware.proxy,
                server.proxy.host,
                server.proxy.port,
                setProxyStatus,
              ),
            5000,
          )
        })()
      : null

    server.middleware.dev
      ? (async () => {
          setInterval(
            async () =>
              await checkStatus(
                server.middleware.dev,
                server.host,
                server.port,
                setServerStatus,
              ),
            5000,
          )
        })()
      : null
  }, [server])

  return isDevelopment ? (
    <Box flexDirection="row" justifyContent="space-between">
      <Box flexDirection="column">
        <Status
          label={'SERVE'}
          status={serverStatus}
          colors={props.theme.colors}
          enabled={server.middleware.dev}
          host={server.host}
          port={server.port}
        />

        <Status
          label={'PROXY'}
          status={proxyStatus}
          colors={props.theme.colors}
          enabled={server.middleware.proxy}
          host={server.proxy.host}
          port={server.proxy.port}
        />

        {server.middleware.hot ? (
          <Text>{`HMR:   enabled`}</Text>
        ) : (
          <Text dimColor>{`HMR:   disabled`}</Text>
        )}
      </Box>
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
const Status: React.FunctionComponent<Dashboard.DevServerStatus> = ({
  enabled,
  host,
  port,
  status,
  label,
  colors,
}) => {
  const color = (() => {
    switch (true) {
      case status == 200:
        return colors.success

      case status >= 400:
        return colors.error

      default:
        return colors.warning
    }
  })()

  return enabled ? (
    <Text>
      {`${label}: ${host}:${port}`}
      {status ? (
        <Text color={color}> [{status}]</Text>
      ) : (
        <Text>
          {' '}
          <Spinner />
        </Text>
      )}
    </Text>
  ) : (
    <Text dimColor>{`${label}: disabled`}</Text>
  )
}
