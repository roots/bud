import React from 'react'
import {Asset} from './Asset'
import {Dashboard} from '@roots/bud-framework'
import {Box} from 'ink'

/**
 * Asset component
 */
const Assets: Dashboard.Component = ({stats, theme}) => (
  <Box flexDirection="column" width={theme.bounds.width}>
    {stats?.assets?.map((asset, id) => (
      <Asset theme={theme} key={id} {...asset} />
    ))}
  </Box>
)

export {Assets}
