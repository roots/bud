import React from 'react'

import {TextInput} from './TextInput.js'

export const UncontrolledTextInput = ({
  initialValue = ``,
  ...props
}) => {
  const [value, setValue] = React.useState(initialValue)

  return <TextInput {...props} value={value} onChange={setValue} />
}
