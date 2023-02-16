import figures from '@roots/bud-support/figures'
import Ink from '@roots/bud-support/ink'
import Link from '@roots/bud-support/ink-link'
import {externalNetworkInterface} from '@roots/bud-support/os'
import React from '@roots/bud-support/react'

import {color} from '../format.js'
import useWatchedFilesCount from './useWatchedFilesCount.js'

interface Props {
  devUrl?: URL
  publicDevUrl?: URL
  watchFiles: Set<string>
  displayServerInfo: boolean
  proxyUrl?: URL
  publicProxyUrl?: URL
}

/**
 * Server info ink component
 */
export const Server = ({
  devUrl,
  publicDevUrl,
  displayServerInfo,
  watchFiles = new Set(),
  proxyUrl,
  publicProxyUrl,
}: Props) => {
  const hasMappedProxyUrl =
    publicProxyUrl?.origin &&
    proxyUrl.origin &&
    publicProxyUrl?.origin !== proxyUrl.origin

  const hasMappedDevUrl =
    devUrl?.origin &&
    publicDevUrl?.origin &&
    publicDevUrl.origin !== devUrl.origin

  const ipv4 = externalNetworkInterface.ipv4Url(publicDevUrl.protocol)
  ipv4.port = publicDevUrl.port

  const watchedFilesCount = useWatchedFilesCount(watchFiles)

  return (
    <Ink.Box flexDirection="column">
      <Ink.Box flexDirection="row">
        <Ink.Text color={color.blue} dimColor={!displayServerInfo}>
          {figures.info} <Ink.Text underline>s</Ink.Text>erver
        </Ink.Text>
      </Ink.Box>

      {displayServerInfo ? (
        <>
          <Ink.Text dimColor>{figures.lineVerticalDashed7}</Ink.Text>

          {hasMappedProxyUrl && proxyUrl && publicProxyUrl ? (
            <>
              <Value label="proxy (internal)" value={proxyUrl.origin} />
              <Value
                label="proxy (external)"
                value={publicProxyUrl.origin}
              />
              <Ink.Text dimColor>{figures.lineVertical}</Ink.Text>
            </>
          ) : proxyUrl ? (
            <>
              {<Value label="proxy" value={proxyUrl.origin} />}
              <Ink.Text dimColor>{figures.lineVertical}</Ink.Text>
            </>
          ) : null}

          {hasMappedDevUrl && devUrl && publicDevUrl ? (
            <>
              <Value label="dev (internal)" value={devUrl.origin} />
              <Value label="dev (external)" value={publicDevUrl.origin} />
              <Value label="ipv4" value={ipv4.origin} last />
            </>
          ) : devUrl ? (
            <>
              {devUrl && <Value label="dev" value={devUrl.origin} />}
              <Value label="ipv4" value={ipv4.origin} last />
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
