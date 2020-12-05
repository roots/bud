import React, {FunctionComponent} from 'react'
import {Box, Text} from 'ink'
import {Indicator} from '../UI/Indicator'
import {useStyle} from '@roots/ink-use-style'

const Asset = ({name, active, size, hot, info}) => {
  const {ctx, col, colors} = useStyle()

  return (
    <Box
      flexDirection={'row'}
      justifyContent={ctx(['flex-start', 'space-between'])}>
      <Box width={col(6)}>
        <Text
          wrap="truncate-end"
          color={active ? 'white' : 'gray'}>
          <Indicator active={active} />
          {name}{' '}
        </Text>
      </Box>

      <Box
        width={col(4)}
        alignItems="flex-end"
        justifyContent="flex-end">
        <Text wrap="truncate" color={'white'}>
          {Object.keys(info).map((item, id) => (
            <Text color={colors.accent} key={id}>
              [{item}]{' '}
            </Text>
          ))}
        </Text>
      </Box>

      <Box
        width={col(2)}
        alignItems="flex-end"
        justifyContent="flex-end">
        <Text wrap="truncate-end" color={colors.success}>
          {size / 1000}kb
        </Text>
      </Box>
    </Box>
  )
}

declare namespace Asset {
  export type Component = FunctionComponent<Interface>
  interface Interface {
    name: string
    active: boolean
    size: number
    hot: boolean
    info?: string[]
  }
}

export {Asset as default}
