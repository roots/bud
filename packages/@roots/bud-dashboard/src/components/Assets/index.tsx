import React from 'react'
import {Asset} from './Asset'
import {Dashboard} from '@roots/bud-framework'

/**
 * Asset component
 */
const Assets: Dashboard.Component = ({stats, theme}) => (
  <>
    {stats?.assets?.map((asset, id) => (
      <Asset theme={theme} key={id} {...asset} />
    ))}
  </>
)

export {Assets}
