import React, {useEffect} from 'react'
import {Box, Spacer, Text, useFocus} from 'ink'

/**
 * Assets
 */
const Assets = ({build, actions, width}) => {
  const {isFocused} = useFocus({autoFocus: true})
  useEffect(() => {
    actions.setFocus({assets: isFocused})
  }, [isFocused])

  return (
    <Box
      display={isFocused ? 'flex' : 'none'}
      flexDirection="column">
      {build?.assets?.map((asset, id) => (
        <Box
          flexDirection="row"
          justifyContent="space-between"
          maxWidth={width}
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
      {build?.assets?.length == 0 && <Text>Loading</Text>}
    </Box>
  )
}

export default Assets
