import React from 'react'
import {Box, Text, Spacer} from 'ink'

const SassError = ({error}) => {
  const intro = 'SassError:'
  const divider = '-----------------^'

  error = error.split(intro).slice(1).join('')

  error = error
    .split(divider)
    .slice(0, error.split(divider).length - 1)

  error = error.map(err => {
    const [message, code] = err.split('>>')
    const title = message.split('\n').shift()
    return {title, message, code}
  })

  return error?.map(({title, message, code}, id) => (
    <Box key={id} flexDirection="column">
      <Text bold>{title}</Text>
      <Spacer />
      <Text>{message}</Text>
      <Text color="red">{code}</Text>
    </Box>
  ))
}

export {SassError as default}
