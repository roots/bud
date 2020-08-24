import React, {useEffect, FunctionComponent} from 'react'
import {Box, Spacer, Text, useFocus} from 'ink'

interface IndicatorProps {
  emitted: boolean
}

const Indicator: FunctionComponent<IndicatorProps> = ({emitted}) => (
  <Text color={emitted ? '#545DD7' : '#6C758F'}>⦿ </Text>
)

interface AssetInterface {
  name: string
  emitted: boolean
  size: number
}

const Asset: FunctionComponent<AssetInterface> = ({
  name,
  emitted,
  size,
}) => {
  const display =
    name.split('.').pop() == 'css' || name.split('.').pop() == 'js'

  return !display ? (
    <Box></Box>
  ) : (
    <Box flexDirection="row" justifyContent="space-between">
      <Box>
        <Indicator emitted={emitted} />
        <Text color={emitted ? 'white' : 'gray'}>{name}</Text>
      </Box>
      <Spacer />
      <Box>
        <Text dimColor={true}>{size / 1000}kb</Text>
      </Box>
    </Box>
  )
}

interface AssetsProps {
  build: {
    assets: AssetInterface[]
  }
  actions: {
    setFocus: (any) => void
  }
}

const Assets: FunctionComponent<AssetsProps> = ({build, actions}) => {
  const {isFocused} = useFocus({autoFocus: true})
  useEffect(() => {
    actions.setFocus({assets: isFocused})
  }, [isFocused])

  return (
    <Box display={isFocused ? 'flex' : 'none'} flexDirection="column">
      {build?.assets?.map((asset, id) => (
        <Asset
          key={id}
          name={asset.name}
          size={asset.size}
          emitted={asset.emitted}
        />
      ))}
      {build?.assets?.length == 0 && <Text>Loading</Text>}
    </Box>
  )
}

export {Assets}
