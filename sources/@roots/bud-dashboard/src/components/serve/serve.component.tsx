import {Newline, Text} from 'ink'
import Spinner from 'ink-spinner'
import React from 'react'

import {Url} from './url.component'

export const Serve = ({features, theme, server}) => {
  return (
    <Text>
      <Text color={theme?.colors.text}>
        <Url label="dev" value={server.dev.url} />
      </Text>
      <Newline />

      {features.proxy && server.proxy.url && (
        <Text color={theme?.colors.text}>
          <Url label="proxy" value={server.proxy.url} />
        </Text>
      )}
      <Newline />
      <Newline />

      <Text>
        <Spinner /> waiting for changes...{' '}
        <Text color="dim">🆀 to exit</Text> <Newline />
      </Text>
    </Text>
  )
}
