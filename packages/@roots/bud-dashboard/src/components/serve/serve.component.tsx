import {Newline, Text} from 'ink'
import React from 'react'
import {URL} from 'url'

const Url = ({href}) => {
  let url = new URL(href).origin

  url = [
    url.endsWith(':80'),
    url.endsWith(':443'),
    url.endsWith(':8080'),
  ].find(Boolean)
    ? url.split(':').slice(0, 2).join(':')
    : url

  return <Text>{url}</Text>
}

export const Serve = ({theme, server}) => {
  return (
    <Text>
      <Text color={theme?.colors.text}>
        dev:{' '}
        <Text color={theme?.colors.accent}>
          <Url href={server.dev.url} />
        </Text>
      </Text>
      <Newline />

      {server.middleware.proxy && (
        <Text color={theme?.colors.text}>
          proxy:{' '}
          <Text color={theme?.colors.accent}>
            <Url href={server.proxy.url} />
          </Text>
        </Text>
      )}
      <Newline />
    </Text>
  )
}
