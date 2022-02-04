import {Styles} from '@roots/ink-use-style'
import {Box, Newline, Text} from 'ink'
import Spinner from 'ink-spinner'
import React from 'react'

import {Url} from './url.component'

interface Props {
  url: URL
  proxy?: URL
  theme: Styles
}

export const Serve = ({url, proxy, theme}: Props) => {
  return (
    <Box flexDirection={`column`}>
      <Newline />

      <Text color={theme?.colors.text}>
        <Url label="dev" value={url} />
      </Text>

      {proxy && (
        <Text color={theme?.colors.text}>
          <Url label="proxy" value={proxy} />
        </Text>
      )}

      <Newline />

      <Text>
        <Spinner /> waiting for changes... <Text color="dim">🆀 to exit</Text>{' '}
        <Newline />
      </Text>
    </Box>
  )
}
