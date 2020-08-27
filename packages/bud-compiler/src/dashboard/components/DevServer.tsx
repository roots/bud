import React, {useEffect, useState} from 'react'
import {Box, Text, useFocus, Spacer} from 'ink'
import {format} from 'prettier'

const DevServer = ({build, actions, bud}) => {
  const {isFocused} = useFocus({autoFocus: false})
  useEffect(() => {
    actions?.setFocus({devServer: isFocused})
  }, [isFocused])

  return (
    <Box display={isFocused ? 'flex' : 'none'} flexDirection="column">
      <Box paddingLeft={1} paddingRight={1} flexDirection="column">
        {/* <Text color='green'>Client</Text>
        <Text wrap="wrap">{format(JSON.stringify(build?.client), {parser: 'json'}) || ''}</Text>
        <Spacer />*/}
        <Text color='green'>Server</Text>
        <Text wrap="wrap">{format(JSON.stringify(build?.client), {parser: 'json'}) || ''}</Text>
      </Box>
    </Box>
  )
}

export {DevServer}
