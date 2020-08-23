import React, {useEffect, useState} from 'react'
import {Box, Text, useFocus} from 'ink'
import PropTypes from 'prop-types'
import patchConsole from 'patch-console'

/**
 * DevServer info
 *
 * @prop {object} actions
 * @return {PropTypes.ReactComponentLike}
 */
const DevServer = ({build, actions}) => {
  const {isFocused} = useFocus({autoFocus: false})
  useEffect(() => {
    actions?.setFocus({devServer: isFocused})
  }, [isFocused])

  /**
   * Capture DevServer console out using `patch-console`. This
   * pkg allows for inserting the console.out into a specific place
   * in the component. Left alone the stdout/stderr and the React CLI
   * will conflict.
   *
   * Additionally, compare the last rendered text with the new render.
   * If they are identical it's likely the DevServer watching message.
   * Discard it if they are a match so we don't just repeat that message
   * ad nauseum.
   */
  const [lastConsole, setLastConsole] = useState(null)
  const [consoleOut, setConsoleOut] = useState('')
  patchConsole((stream, data) => {
    setLastConsole(data)

    const frameOut =
      lastConsole !== data ? consoleOut + data : consoleOut
    setConsoleOut(frameOut)
  })

  return (
    <Box display={isFocused ? 'flex' : 'none'} flexDirection="column">
      <Text>{build?.devServer}</Text>
    </Box>
  )
}

DevServer.propTypes = {
  build: PropTypes.object,
  actions: PropTypes.object,
}

export {DevServer}
