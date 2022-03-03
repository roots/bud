import {Framework} from '@roots/bud-framework'
import {useStdin} from 'ink'
import {Box, Text} from 'ink'
import React from 'react'

import {Input} from './input.component'
import {Url} from './url.component'

/**
 * Server/Proxy info component
 *
 * @public
 */
export const Serve = ({app}: {app: Framework}) => {
  const {isRawModeSupported} = useStdin()
  isRawModeSupported && Input({app})

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
