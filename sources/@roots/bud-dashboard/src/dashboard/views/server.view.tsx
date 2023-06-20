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
        <Box flexDirection="row" gap={1} overflowX="hidden" width="100%">
          <Box flexDirection="row" minWidth="1" overflowX="hidden">
            <Text wrap="truncate-end">
              <Spinner type="dots" />
              {` `}
              Watching project sources
            </Text>
          </Box>

          {watchedFilesCount > 0 && (
            <Text dimColor wrap="truncate-end">
              (and {watchedFilesCount} other{` `}
              {watchedFilesCount > 1 ? `modules` : `module`})
            </Text>
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

            <Text wrap="truncate-end">{proxyUrl.href}</Text>
          </Box>
        )}

        {devUrl?.href && (
          <Box flexDirection="row" gap={2} paddingLeft={1}>
            <Box minWidth={5}>
              <Text color="cyan">dev</Text>
            </Box>

            <Box flexDirection="column">
              <Text wrap="truncate-end">{devUrl.href}</Text>
              {ipv4.href !== devUrl.href && (
                <Text wrap="truncate-end">{ipv4.href}</Text>
              )}
            </Box>
          </Box>
        )}
      </Box>
    </View>
  )
}
