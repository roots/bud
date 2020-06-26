import notifier from 'node-notifier'
import React, {useEffect, useState} from 'react'
import {Color, Box, Text} from 'ink'

/**
 * Error
 */
const Error = ({error}) => {
  const [message, setMessage] = useState(null)
  const [file, setFile] = useState(null)
  useEffect(() => {
    error
      ? (() => {
          const lines = error.split('\n').splice(0, 2)
          const file = lines[0]
          const message = `${error}`

          message ? setMessage(message) : setMessage(null)
          file ? setFile(file) : setFile(null)
        })()
      : (() => {
          setMessage(null)
          setFile(null)
        })()
  }, [])

  useEffect(() => {
    message &&
      notifier.notify({
        title: 'Build error.',
        message: message || '',
        subtitle: file || '',
      })
  }, [file, message])

  return message ? (
    <Box flexDirection="column">
      {file && (
        <Text textWrap="truncate">
          <Box flexDirection="column">
            {unescape(error)
              .split(' @ ')
              .splice(1)
              .filter(err => !err.includes('multi'))
              .map((err, i) => (
                <Text textWrap="truncate" key={i}>
                  <Color hex="#dc3545">⚠</Color>{' '}
                  {err.replace('\n', '')}
                </Text>
              ))}
          </Box>
        </Text>
      )}
    </Box>
  ) : (
    []
  )
}

export default Error
