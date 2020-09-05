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
  const display =
    (name.split('.').pop() == 'css' ||
      name.split('.').pop() == 'js') &&
    name.split('.')[name.split('.').length - 2] !== 'hot-update'

  const sizeColor =
    size / 1000 > 200
      ? 'red'
      : size / 1000 > 100
      ? 'yellow'
      : 'white'

  return !display ? (
    <Box></Box>
  ) : (
    <Box flexDirection="row" justifyContent="flex-start">
      <Box>
        <Indicator emitted={emitted} />

        <Text color={emitted ? 'white' : 'gray'}>
          {name} {hot && '🔥'}
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
