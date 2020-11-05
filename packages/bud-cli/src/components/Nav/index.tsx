import React, {FunctionComponent} from 'react'
import {Box} from 'ink'
import {Item} from './Item'
import {useStyle} from '@roots/ink-use-style'

const Nav: FunctionComponent = () => {
  const {ctx, colors} = useStyle()

  const items = [
    {
      name: 'assets',
      display: 'Assets',
      color: colors.primary,
    },
    {
      name: 'errors',
      display: 'Errors',
      color: colors.error,
    },
    {
      name: 'warnings',
      display: 'Warnings',
      color: colors.warning,
    },
    {
      name: 'dev',
      display: 'Dev',
      color: colors.primary,
    },
  ]

  return (
    <Box
      justifyContent={'flex-start'}
      flexDirection={ctx(['column', 'row'])}>
      {items.map((item, id) => (
        <Item key={id} {...item} />
      ))}
    </Box>
  )
}

export {Nav}
