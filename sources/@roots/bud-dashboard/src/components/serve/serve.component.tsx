import {Framework} from '@roots/bud-framework'
import {Box, Text} from 'ink'
import React from 'react'

import {Url} from './url.component'

export const Serve = ({app}: {app: Framework}) => {
  return (
    <Box flexDirection={`column`} marginBottom={1}>
      <Text color={`white`}>
        <Url label="dev" value={app.hooks.filter('dev.url')} />
      </Text>

      {app.hooks.filter('middleware.enabled').includes('proxy') && (
        <Text color={`white`}>
          <Url
            label="proxy"
            value={app.hooks.filter('middleware.proxy.target')}
          />
        </Text>
      )}
    </Box>
  )
}
