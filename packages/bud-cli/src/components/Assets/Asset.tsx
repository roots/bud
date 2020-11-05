import React, {FunctionComponent} from 'react'
import {Box, Text} from 'ink'
import {useStyle} from '@roots/ink-use-style'

import {Indicator} from '../UI/Indicator'

interface AssetInterface {
  name: string
  active: boolean
  size: number
  hot: boolean
}

const Asset: FunctionComponent<AssetInterface> = ({
  name,
  active,
  size,
  hot,
}) => {
  const {ctx, is} = useStyle()

  const roundedSize = Math.round(size / 1000)

  return (
    <Box
      flexDirection={'row'}
      justifyContent={ctx(['space-between', 'flex-start'])}>
      <Box>
        <Text
          wrap="truncate-end"
          color={active ? 'white' : 'gray'}>
          <Indicator active={active} />
          {is(hot, `🔥 ${name} `, ` ${name} `)}
        </Text>
      </Box>

      <Box justifyContent={'flex-end'}>
        <Text wrap="truncate" dimColor={true}>
          {roundedSize}kb
        </Text>
      </Box>
    </Box>
  )
}

export {Asset as default}
