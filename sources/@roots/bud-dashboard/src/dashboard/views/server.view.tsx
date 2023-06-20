import figures from '@roots/bud-support/figures'
import {Box, Spinner, Text} from '@roots/bud-support/ink'
import {externalNetworkInterface} from '@roots/bud-support/os'

import View from '../components/view.component.js'
import {useWatchedFilesCount} from '../hooks/useWatchedFilesCount.js'

interface Props {
  devUrl?: URL
  displayServerInfo?: boolean
  mode?: `development` | `production`
  proxy?: unknown
  proxyUrl?: URL
  watchFiles: Set<string>
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
  watchFiles = new Set(),
}: Props) => {
  const watchedFilesCount = useWatchedFilesCount(watchFiles)

  if (!displayServerInfo) return null
  if (mode !== `development`) return null
  if (!devUrl || !(devUrl instanceof URL)) return null

  const ipv4 = externalNetworkInterface.ipv4Url(devUrl.protocol)
  ipv4.port = devUrl.port

  return (
    <View
      footer={
        <Box flexDirection="row" gap={1}>
          <Text>
            <Spinner type="dots" />
          </Text>

          <Text>Watching project sources</Text>

          {watchedFilesCount > 0 && (
            <Box flexDirection="row" gap={1}>
              <Text dimColor>(and {watchedFilesCount} other</Text>
              <Text dimColor>
                {watchedFilesCount > 1 ? `modules` : `module`})
              </Text>
            </Box>
          )}
        </Box>
      }
      head={<Text color="blue">{figures.nodejs} Server info</Text>}
    >
      <Box flexDirection="column" gap={1}>
        {proxy && proxyUrl?.href && (
          <Box flexDirection="row" gap={2} paddingLeft={1}>
            <Box minWidth={5}>
              <Text color="cyan">proxy</Text>
            </Box>

            <Box flexDirection="column">
              <Text>{proxyUrl.href}</Text>
            </Box>
          </Box>
        )}

        {devUrl?.href && (
          <Box flexDirection="row" gap={2} paddingLeft={1}>
            <Box minWidth={5}>
              <Text color="cyan">dev</Text>
            </Box>

            <Box flexDirection="column">
              <Text>{devUrl.href}</Text>
              {ipv4.href !== devUrl.href && <Text>{ipv4.href}</Text>}
            </Box>
          </Box>
        )}
      </Box>
    </View>
  )
}
