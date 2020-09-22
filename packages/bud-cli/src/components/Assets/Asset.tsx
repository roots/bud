import React, {FunctionComponent} from 'react'
import {Box, Spacer, Text} from 'ink'
import Indicator from '../UI/Indicator'

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
  const sizeColor =
    size / 1000 > 200
      ? 'red'
      : size / 1000 > 100
      ? 'yellow'
      : 'white'

  return (
    <Box flexDirection="row" justifyContent="flex-start">
      <Box width={20}>
        <Indicator emitted={emitted} />
        <Text color={emitted ? 'white' : 'gray'}>
          {hot && ' 🔥 '} {name}
        </Text>
      </Box>

      <Spacer />

      <Box>
        <Text color={sizeColor} dimColor={true}>
          {size / 1000}kb
        </Text>
      </Box>
    </Box>
  )
}

export {Asset as default}
