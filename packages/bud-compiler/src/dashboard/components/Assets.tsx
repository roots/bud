import React, {useEffect, FunctionComponent} from 'react'
import {Box, Spacer, Text, useFocus} from 'ink'

interface IndicatorProps {
  emitted: boolean
}

const Indicator: FunctionComponent<IndicatorProps> = ({emitted}) => (
  <Text color={emitted ? '#545DD7' : '#6C758F'}>⦿ </Text>
)

interface AssetInterface {
  asset: {
    name: string
    emitted: boolean
    size: number
  }
}

const Asset: FunctionComponent<AssetInterface> = ({asset}) => {
  const display =
    asset.name.split('.').pop() == 'css' ||
    asset.name.split('.').pop() == 'js'

  return !display ? (
    <Box></Box>
  ) : (
    <Box flexDirection="row" justifyContent="space-between">
      <Box>
        <Indicator emitted={asset.emitted} />
        <Text color={asset.emitted ? 'white' : 'gray'}>
          {asset.name}
        </Text>
      </Box>
      <Spacer />
      <Box>
        <Text dimColor={true}>{asset.size / 1000}kb</Text>
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
        <Asset key={id} {...asset} />
      ))}
      {build?.assets?.length == 0 && <Text>Loading</Text>}
    </Box>
  )
}

export {Assets}
