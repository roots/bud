import {Framework} from '@roots/bud-framework'
import {Styles} from '@roots/ink-use-style'
import {Newline, Text} from 'ink'
import Spinner from 'ink-spinner'
import React from 'react'

import {Url} from './url.component'

interface Props {
  app: Framework
  theme: Styles
}

export const Serve = ({app, theme}: Props) => {
  const devUrl = app.hooks.filter('dev.url')

  const proxyEnabled = app.hooks
    .filter('middleware.enabled')
    .includes('proxy')
  const proxyUrl = app.hooks.filter('middleware.proxy.target')

  return (
    <Text>
      <Text color={theme?.colors.text}>
        <Url label="dev" value={devUrl} />
      </Text>
      <Newline />

      {proxyEnabled && proxyUrl && (
        <Text color={theme?.colors.text}>
          <Url label="proxy" value={proxyUrl} />
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
