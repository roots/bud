import {Dashboard} from '@roots/bud-framework'
import React from 'react'
import {Box} from 'ink'
import {Asset} from './Asset'

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
