import {lodash} from '@roots/bud-support'
import {Newline, Text} from 'ink'
import React from 'react'

const {isString} = lodash

export const Serve = ({theme, server}) => {
  return (
    <Text>
      <Text color={theme?.colors.text}>
        dev:{' '}
        <Text color={theme?.colors.accent}>
          {server.host}:{server.port}
        </Text>
      </Text>
      <Newline />

      {server.middleware.proxy && (
        <Text color={theme?.colors.text}>
          proxy:{' '}
          <Text color={theme?.colors.accent}>
            {isString(server.proxy.target)
              ? server.proxy.target
              : JSON.stringify(server.proxy.target)}
          </Text>
        </Text>
      )}
      <Newline />
    </Text>
  )
}
