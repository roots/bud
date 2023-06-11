// @ts-nocheck

import figures from '@roots/bud-support/figures'
import {Box, Text} from '@roots/bud-support/ink'
import {externalNetworkInterface} from '@roots/bud-support/os'
import React from 'react'

import Space from '../display/space.component.js'
import Title from '../display/title.component.js'
import {color} from '../format.js'
import useWatchedFilesCount from './useWatchedFilesCount.js'

interface Props {
  devUrl?: URL
  displayServerInfo: boolean
  proxyUrl?: URL
  publicDevUrl?: URL
  publicProxyUrl?: URL
  watchFiles: Set<string>
}

/**
 * Server info ink component
 */
export const Server = ({
  devUrl,
  displayServerInfo,
  proxyUrl,
  publicDevUrl,
  publicProxyUrl,
  watchFiles = new Set(),
}: Props) => {
  const ipv4 = externalNetworkInterface.ipv4Url(publicDevUrl.protocol)
  ipv4.port = publicDevUrl.port

  const watchedFilesCount = useWatchedFilesCount(watchFiles)

  return (
    <Box flexDirection="column">
      <Box flexDirection="row">
        <Text dimColor>
          {figures.lineDownRightArc}
          {figures.line}
        </Text>
        <Text color={color.blue} dimColor={!displayServerInfo}>
          {` `}server
        </Text>
      </Box>

      {displayServerInfo && (
        <>
          <Space>
            <Text> </Text>
          </Space>

          <Box flexDirection="column">
            {proxyUrl && (
              <Title>
                <Text>
                  proxy:{` `}
                  {publicProxyUrl && publicProxyUrl.href !== proxyUrl.href
                    ? `${publicProxyUrl.href}`
                    : proxyUrl.href}
                </Text>
              </Title>
            )}

            {devUrl && (
              <Title>
                <Text>
                  dev:{`   `}
                  {publicDevUrl && publicDevUrl.href !== devUrl.href
                    ? `${publicDevUrl.href}`
                    : devUrl.href}
                </Text>
              </Title>
            )}
          </Box>

          <Space>
            <Text> </Text>
          </Space>

          <Title final finalFigure={figures.lineUpRightArc}>
            <Text dimColor>
              watching project sources
              {watchedFilesCount > 0 ? (
                <Text dimColor>
                  {` `}
                  (and {watchedFilesCount} other{` `}
                  {watchedFilesCount > 1 ? `files` : `file`}){` `}
                </Text>
              ) : null}
            </Text>
          </Title>
        </>
      )}
    </Box>
  )
}
