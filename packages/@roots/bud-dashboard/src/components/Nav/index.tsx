import {React, Box, useStyle} from '@roots/bud-support'
import {Item} from './Item'

namespace Nav {
  export interface Item {
    name: string
    display: string
    color: string
  }
}

const Nav: React.FunctionComponent = () => {
  const {ctx, colors} = useStyle()

  const items: Nav.Item[] = [
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
