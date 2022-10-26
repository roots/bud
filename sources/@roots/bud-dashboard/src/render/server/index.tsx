import {Box, Text} from '@roots/bud-support/ink'
import Link from '@roots/bud-support/ink-link'
import React from '@roots/bud-support/react'
import figures from 'figures'

import {color} from '../format.js'
import getProxy from './getProxy.js'
import getServer from './getServer.js'
import useWatchedFilesCount from './useWatchedFilesCount.js'

interface Props {
  devUrl?: URL
  watchFiles: Set<string>
  displayServerInfo: boolean
  proxyUrl?: URL
}

/**
 * Server info ink component
 *
 * @public
 */
export const Server = ({
  devUrl,
  displayServerInfo,
  watchFiles = new Set(),
  proxyUrl,
}: Props) => {
  const server = getServer(devUrl)
  const proxy = getProxy(proxyUrl)
  const watchedFilesCount = useWatchedFilesCount(watchFiles)

  return (
    <Box flexDirection="column">
      <Box flexDirection="row">
        <Text color={color.cyan} dimColor={!displayServerInfo}>
          {figures.info} <Text underline>s</Text>erver
        </Text>
      </Box>

      {displayServerInfo ? (
        <>
          <Text dimColor>{figures.lineVerticalDashed7}</Text>

          {proxy && <Value label="proxy" value={proxy} />}

          {server ? (
            <>
              <Value label="internal" value={server.internal} />
              <Value label="external" value={server.external} />
            </>
          ) : null}

          <Box
            marginTop={1}
            minWidth="100%"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Text>
              {figures.ellipsis} watching project sources
              {watchedFilesCount > 0 && (
                <Text dimColor>
                  {` `}
                  (and {watchedFilesCount} other{` `}
                  {watchedFilesCount > 1 ? `files` : `file`}){` `}
                </Text>
              )}
            </Text>

            <Text>
              {figures.info} <Text dimColor>ctrl+c to exit</Text>
            </Text>
          </Box>
        </>
      ) : null}
    </Box>
  )
}

const Value = ({label, value}: {label: string; value: string}) => (
  <Box flexDirection="row">
    <Box marginRight={1}>
      <Text dimColor>├─ {label}:</Text>
    </Box>

    <Box>
      {/* @ts-ignore */}
      <Link url={value}>
        <Text>{value}</Text>
      </Link>
    </Box>
  </Box>
)
