import React, {useEffect, useState} from 'react'
import {Box, useFocus} from 'ink'
import Error from './Error'

/**
 * Error
 */
const Errors = ({build, actions}) => {
  const {isFocused} = useFocus({autoFocus: true})
  useEffect(() => {
    actions?.setFocus({errors: isFocused})
  }, [isFocused])

  const [display, setDisplay] = useState(null)
  useEffect(() => {
    setDisplay(isFocused)
  }, [isFocused, build?.errors])

  return (
    <Box
      display={display ? 'flex' : 'none'}
      flexDirection="column">
      {build?.errors?.length > 0 &&
        build?.errors?.map((err, i) => (
          <Error message={err} key={i} />
        ))}
    </Box>
  )
}

export default Errors
