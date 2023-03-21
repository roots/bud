// @ts-nocheck

import figures from '@roots/bud-support/figures'
import {externalNetworkInterface} from '@roots/bud-support/os'
import * as Ink from 'ink'
import React from 'react'

import Space from '../display/space.component.js'
import Title from '../display/title.component.js'
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
  const ipv4 = externalNetworkInterface.ipv4Url(publicDevUrl.protocol)
  ipv4.port = publicDevUrl.port

  const watchedFilesCount = useWatchedFilesCount(watchFiles)

  return (
    <Ink.Box flexDirection="column">
      <Ink.Box flexDirection="row">
        <Ink.Text dimColor>
          {figures.lineDownRightArc}
          {figures.line}
        </Ink.Text>
        <Ink.Text color={color.blue} dimColor={!displayServerInfo}>
          {` `}server
        </Ink.Text>
      </Ink.Box>

      {displayServerInfo && (
        <>
          <Space>
            <Ink.Text> </Ink.Text>
          </Space>

          <Ink.Box flexDirection="column">
            {proxyUrl && (
              <Title>
                <Ink.Text>
                  proxy:{` `}
                  {publicProxyUrl && publicProxyUrl.href !== proxyUrl.href
                    ? `${publicProxyUrl.href}`
                    : proxyUrl.href}
                </Ink.Text>
              </Title>
            )}

            {devUrl && (
              <Title>
                <Ink.Text>
                  dev:{`   `}
                  {publicDevUrl && publicDevUrl.href !== devUrl.href
                    ? `${publicDevUrl.href}`
                    : devUrl.href}
                </Ink.Text>
              </Title>
            )}
          </Ink.Box>

          <Space>
            <Ink.Text> </Ink.Text>
          </Space>

          <Title final finalFigure={figures.lineUpRightArc}>
            <Ink.Text dimColor>
              watching project sources
              {watchedFilesCount > 0 ? (
                <Ink.Text dimColor>
                  {` `}
                  (and {watchedFilesCount} other{` `}
                  {watchedFilesCount > 1 ? `files` : `file`}){` `}
                </Ink.Text>
              ) : null}
            </Ink.Text>
          </Title>
        </>
      )}
    </Ink.Box>
  )
}
