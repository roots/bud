import React, {useState, useEffect} from 'react'
import {Box, Spacer, Text, useFocus} from 'ink'

/**
 * Assets
 */
const Assets = ({build, actions}) => {
  const {isFocused} = useFocus({autoFocus: true})
  useEffect(() => {
    actions.setFocus({assets: isFocused})
  }, [isFocused])

  const [assets, setAssets] = useState([])
  useEffect(() => {
    setAssets(build?.assets)
  }, [build?.assets])

  return (
    <Box
      display={isFocused ? 'flex' : 'none'}
      flexDirection="column">
      {assets?.map((asset, id) => (
        <Box
          flexDirection="row"
          justifyContent="space-between"
          key={id}>
          <Box>
            <Text
              color={asset.emitted ? '#545DD7' : '#6C758F'}>
              ⦿{' '}
            </Text>
            <Text color={asset.emitted ? 'white' : 'gray'}>
              {asset.name}
            </Text>
          </Box>
          <Spacer />
          <Box>
            <Text dimColor="white">
              {asset.size / 1000}kb
            </Text>
          </Box>
        </Box>
      ))}
      {assets?.length == 0 && <Text>Loading</Text>}
    </Box>
  )
}

export default Assets
