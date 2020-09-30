import React, {FunctionComponent} from 'react'
import {Box, Text} from 'ink'
import Indicator from '../UI/Indicator'

import useAppStyles from '../../hooks/useAppStyles'

interface AssetInterface {
  name: string
  emitted: boolean
  size: number
  hot: boolean
}

const Asset: FunctionComponent<AssetInterface> = ({
  name,
  emitted,
  size,
  hot,
}) => {
  const {ctx, is, col} = useAppStyles()

  const roundedSize = Math.round(size / 1000)

  return (
    <Box
      flexDirection={ctx(['row'])}
      justifyContent={ctx(['space-between', 'flex-start'])}
      width={col(12)}>
      <Box width={ctx([col(12)])}>
        <Text
          wrap="truncate-end"
          color={emitted ? 'white' : 'gray'}>
          <Indicator emitted={emitted} />
          {is(hot, `🔥 ${name} `, ` ${name} `)}
        </Text>
      </Box>

      <Box
        justifyContent={ctx(['flex-end'])}
        width={ctx([col(12), col(6)])}>
        <Text wrap="truncate" dimColor={true}>
          {roundedSize}kb
        </Text>
      </Box>
    </Box>
  )
}

export {Asset as default}
