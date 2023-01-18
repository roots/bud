import figures from '@roots/bud-support/figures'
import Ink from '@roots/bud-support/ink'
import Link from '@roots/bud-support/ink-link'
import React from '@roots/bud-support/react'

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
    <Ink.Box flexDirection="column">
      <Ink.Box flexDirection="row">
        <Ink.Text color={color.cyan} dimColor={!displayServerInfo}>
          {figures.info} <Ink.Text underline>s</Ink.Text>erver
        </Ink.Text>
      </Ink.Box>

      {displayServerInfo ? (
        <>
          <Ink.Text dimColor>{figures.lineVerticalDashed7}</Ink.Text>

          {proxy && <Value label="proxy" value={proxy} />}

          {server ? (
            <>
              <Value label="internal" value={server.internal} />
              <Value label="external" last value={server.external} />
            </>
          ) : null}

          <Ink.Box
            marginTop={1}
            minWidth="100%"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Ink.Text>
              {figures.ellipsis} watching project sources
              {watchedFilesCount > 0 && (
                <Ink.Text dimColor>
                  {` `}
                  (and {watchedFilesCount} other{` `}
                  {watchedFilesCount > 1 ? `files` : `file`}){` `}
                </Ink.Text>
              )}
            </Ink.Text>

            <Ink.Text>
              {figures.info} <Ink.Text dimColor>ctrl+c to exit</Ink.Text>
            </Ink.Text>
          </Ink.Box>
        </>
      ) : null}
    </Ink.Box>
  )
}

const Value = ({
  label,
  value,
  last,
}: {
  label: string
  value: string
  last?: boolean
}) => (
  <Ink.Box flexDirection="row">
    <Ink.Box marginRight={1}>
      <Ink.Text dimColor>
        {last ? `└─` : `├─`} {label}:
      </Ink.Text>
    </Ink.Box>

    <Ink.Box>
      {/* @ts-ignore */}
      <Link url={value}>
        <Ink.Text>{value}</Ink.Text>
      </Link>
    </Ink.Box>
  </Ink.Box>
)
