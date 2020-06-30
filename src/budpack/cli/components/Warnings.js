import React, {useEffect, useState} from 'react'
import {Box, Text, useFocus} from 'ink'
import Warning from './Warning'

/**
 * Warnings
 */
const Warnings = ({build, actions}) => {
  const {isFocused} = useFocus({autoFocus: true})
  useEffect(() => {
    actions.setFocus({warnings: isFocused})
  }, [isFocused])

  const [display, setDisplay] = useState(null)
  useEffect(() => {
    setDisplay(isFocused)
  }, [isFocused, build?.warnings])

  return (
    <Box
      paddingLeft={1}
      paddingRight={1}
      display={display ? 'flex' : 'none'}
      flexDirection="column">
      {build?.warnings?.length > 0 &&
        build?.warnings?.map((warning, i) => (
          <Warning message={warning} key={i} />
        ))}

      {build?.warnings?.length == 0 && (
        <Text>Nothing to see here.</Text>
      )}
    </Box>
  )
}

export default Warnings
