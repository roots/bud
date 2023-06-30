import figures from '@roots/bud-support/figures'
import {Box, Text} from '@roots/bud-support/ink'
import {externalNetworkInterface} from '@roots/bud-support/os'

import View from '../components/view.component.js'

interface Props {
  devUrl?: URL
  displayServerInfo?: boolean
  mode?: `development` | `production`
  proxy?: unknown
  proxyUrl?: URL
  publicDevUrl?: URL
  publicProxyUrl?: URL
}

/**
 * Server info ink component
 */
export const Server = ({
  devUrl,
  displayServerInfo = true,
  mode,
  proxy = false,
  proxyUrl,
  publicDevUrl,
  publicProxyUrl,
}: Props) => {
  if (!displayServerInfo) return null
  if (mode !== `development`) return null
  if (!devUrl || !(devUrl instanceof URL)) return null

  const ipv4 = externalNetworkInterface.ipv4Url(devUrl.protocol)
  ipv4.port = devUrl.port

  return (
    <View
      footer={
        <Box flexDirection="row" gap={1} overflowX="hidden" width="100%">
          <Box flexDirection="row" minWidth="1" overflowX="hidden">
            <Text wrap="truncate-end">Watching project sources</Text>
          </Box>
        </Box>
      }
      borderColor="blue"
      head={<Text color="blue">{figures.nodejs} Server info</Text>}
    >
      <Box flexDirection="column" gap={1}>
        {proxy && proxyUrl?.href && (
          <Box flexDirection="row" gap={2} paddingLeft={1}>
            <Box minWidth={5}>
              <Text color="white">proxy</Text>
            </Box>

            <Box flexDirection="column" gap={1}>
              <Text dimColor wrap="truncate-end">
                {figures.lineDashed0} {proxyUrl.href}
              </Text>

              {publicProxyUrl?.href !== proxyUrl.href && (
                <Text dimColor wrap="truncate-end">
                  {figures.lineDashed0} {publicProxyUrl.href}
                </Text>
              )}
            </Box>
          </Box>
        )}

        {devUrl?.href && (
          <Box flexDirection="row" gap={2} paddingLeft={1}>
            <Box minWidth={5}>
              <Text color="white">dev</Text>
            </Box>

            <Box flexDirection="column">
              <Text dimColor wrap="truncate-end">
                {figures.lineDashed0} {devUrl.href}
              </Text>

              {ipv4.href !== devUrl.href && (
                <Text dimColor wrap="truncate-end">
                  {figures.lineDashed0} {ipv4.href}
                </Text>
              )}

              {publicDevUrl?.href !== devUrl.href && (
                <Text dimColor wrap="truncate-end">
                  {figures.lineDashed0} {publicDevUrl.href}
                </Text>
              )}
            </Box>
          </Box>
        )}
      </Box>
    </View>
  )
}
