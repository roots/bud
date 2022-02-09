import {Styles} from '@roots/ink-use-style'
import {Box, Newline, Text} from 'ink'
import Spinner from 'ink-spinner'
import React from 'react'

import {Url} from './url.component'

interface Props {
  middleware: Record<string, boolean>
  url: URL
  proxy?: URL
  theme: Styles
}

export const Serve = ({middleware, url, proxy, theme}: Props) => {
  return (
    <Box flexDirection={`column`} marginBottom={1}>
      <Text color={theme?.colors.text}>
        <Url label="dev" value={url} />
      </Text>

      {middleware.proxy && (
        <Text color={theme?.colors.text}>
          <Url label="proxy" value={proxy} />
        </Text>
      )}

      <Box flexDirection={`column`} marginTop={1}>
        <Text>
          <Spinner /> waiting for changes...{' '}
          <Text color="dim">🆀 to exit</Text> <Newline />
        </Text>
      </Box>
    </Box>
  )
}
