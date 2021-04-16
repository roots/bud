import React from 'react'
import {Box, Text} from 'ink'
import Spinner from 'ink-spinner'
import {Asset} from './Asset'
import {Dashboard} from '@roots/bud-framework'

/**
 * Asset component
 */
const Assets: Dashboard.Component = ({stats, theme}) => {
  if (!stats?.assets || !(stats?.assets?.length > 0)) {
    return (
      <Text>
        <Spinner /> Compiling
      </Text>
    )
  }

  return (
    <Box flexDirection="column">
      {stats.assets.map((asset, id) => (
        <Asset theme={theme} key={id} {...asset} />
      ))}
    </Box>
  )
}

export {Assets}
