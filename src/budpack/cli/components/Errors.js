import React, {useEffect, useState} from 'react'
import {Box, Text, Newline, useFocus} from 'ink'
import Error from './Error'

/**
 * Error
 */
const Errors = ({errors, actions}) => {
  const {isFocused} = useFocus({autoFocus: true})
  useEffect(() => {
    actions.setFocus({errors: isFocused})
  }, [isFocused])

  const [display, setDisplay] = useState(null)
  useEffect(() => {
    setDisplay(isFocused)
  }, [isFocused, errors])

  return (
    <Box
      paddingLeft={1}
      paddingRight={1}
      display={display ? 'flex' : 'none'}
      flexDirection="column">
      {errors?.map((err, i) => (
        <Error error={err} key={i} />
      ))}
      {errors?.length == 0 && (
        <Text>Nothing to see here.</Text>
      )}
    </Box>
  )
}

export default Errors
