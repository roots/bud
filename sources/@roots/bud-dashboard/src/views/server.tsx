import figures from '@roots/bud-support/figures'
import {Box, Text} from '@roots/bud-support/ink'
import {externalNetworkInterface} from '@roots/bud-support/os'

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
  displayServerInfo,
  mode,
  proxy = false,
  proxyUrl,
  publicDevUrl,
  publicProxyUrl,
}: Props) => {
  if (
    !displayServerInfo ||
    mode !== `development` ||
    !devUrl ||
    !(devUrl instanceof URL)
  )
    return null

  return (
    <Box flexDirection="column">
      <Text>{` `}</Text>
      <Text color="blue">Network</Text>
      <Text>{` `}</Text>

      <Proxy
        proxy={proxy}
        proxyUrl={proxyUrl}
        publicProxyUrl={publicProxyUrl}
      />

      <Dev devUrl={devUrl} publicDevUrl={publicDevUrl} />
    </Box>
  )
}

const Proxy = ({
  proxy,
  proxyUrl,
  publicProxyUrl,
}: {
  proxy?: Props[`proxy`]
  proxyUrl?: Props[`proxyUrl`]
  publicProxyUrl?: Props[`publicProxyUrl`]
}) => {
  if (!proxy || !proxyUrl || !(proxyUrl instanceof URL)) return null

  return (
    <Box flexDirection="row" gap={2} paddingLeft={1}>
      <Box minWidth={7}>
        <Text color="white">{figures.pointerSmall} Proxy</Text>
      </Box>

      <Box flexDirection="column" gap={1}>
        <Text dimColor wrap="truncate-end">
          {figures.lineDashed0} {proxyUrl.href}
        </Text>

        {publicProxyUrl?.href &&
          publicProxyUrl?.href !== proxyUrl.href && (
            <Text dimColor wrap="truncate-end">
              {figures.lineDashed0} {publicProxyUrl.href}
            </Text>
          )}
      </Box>
    </Box>
  )
}

const Dev = ({
  devUrl,
  publicDevUrl,
}: {
  devUrl: Props[`devUrl`]
  publicDevUrl: Props[`publicDevUrl`]
}) => {
  if (!devUrl?.href) return null

  const ipv4 = externalNetworkInterface.ipv4Url(devUrl.protocol)
  ipv4.port = devUrl.port

  return (
    <Box flexDirection="row" gap={2} paddingLeft={1}>
      <Box minWidth={7}>
        <Text color="white">{figures.pointerSmall} Dev</Text>
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

        {publicDevUrl && publicDevUrl?.href !== devUrl.href && (
          <Text dimColor wrap="truncate-end">
            {figures.lineDashed0} {publicDevUrl.href}
          </Text>
        )}
      </Box>
    </Box>
  )
}

export {Server as default}
