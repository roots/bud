import React, {useEffect} from 'react'
import {Box, Text, useFocus} from 'ink'
import PropTypes from 'prop-types'
import highlight from 'cli-highlight'

/**
 * Debug display
 */
const Debug = ({actions, config}) => {
  const {isFocused} = useFocus({autoFocus: false})
  useEffect(() => {
    actions?.setFocus({debug: isFocused})
  }, [isFocused])

  return (
    <Box
      display={isFocused && config?.features?.debug ? 'flex' : 'none'}
      flexDirection="column">
      <Text>{highlight(JSON.stringify({config}, null, 4))}</Text>
    </Box>
  )
}

Debug.propTypes = {
  actions: PropTypes.object,
  config: PropTypes.object,
}

export {Debug}
