import {Newline, Text} from 'ink'
import React from 'react'

import {Url} from './url.component'

export const Serve = ({theme, server}) => {
  return (
    <Text>
      <Text color={theme?.colors.text}>
        <Url label="dev" value={server.dev.url} />
      </Text>
      <Newline />

      {server.middleware.proxy && (
        <Text color={theme?.colors.text}>
          <Url label="proxy" value={server.proxy.url} />
        </Text>
      )}
    </Text>
  )
}
