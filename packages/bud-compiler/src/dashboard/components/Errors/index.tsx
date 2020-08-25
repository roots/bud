import React, {useEffect, useState, FunctionComponent} from 'react'
import {Box, Text, useFocus} from 'ink'

import {Error} from './Error'

interface ErrorsProps {
  build: any
  actions: any
}

const Errors: FunctionComponent<ErrorsProps> = ({build, actions}) => {
  const {isFocused} = useFocus({autoFocus: true})
  useEffect(() => {
    actions?.setFocus({errors: isFocused})
  }, [isFocused])

  const [display, setDisplay] = useState(null)
  useEffect(() => {
    setDisplay(isFocused)
  }, [isFocused, build?.errors])

  return (
    <Box display={display ? 'flex' : 'none'} flexDirection="column">
      {build?.errors &&
        build.errors.length > 0 &&
        build.errors.map((err, i) => <Error message={err} key={i} />)}

      {build?.warnings?.length == 0 && (
        <Text>Nothing to see here.</Text>
      )}
    </Box>
  )
}

export {Errors}
