const React = require('react')
const {useEffect, useState} = React
const {Box, Text, useFocus} = require('ink')
const PropTypes = require('prop-types')
const patchConsole = require('patch-console')

/**
 * BrowserSync info
 *
 * @prop {object} actions
 * @return {PropTypes.ReactComponentLike}
 */
const BrowserSync = ({actions}) => {
  const {isFocused} = useFocus({autoFocus: false})
  useEffect(() => {
    actions?.setFocus({browserSync: isFocused})
  }, [isFocused])

  /**
   * Capture BrowserSync console out using `patch-console`. This
   * pkg allows for inserting the console.out into a specific place
   * in the component. Left alone the stdout/stderr and the React CLI
   * will conflict.
   *
   * Additionally, compare the last rendered text with the new render.
   * If they are identical it's likely the BrowserSync watching message.
   * Discard it if they are a match so we don't just repeat that message
   * ad nauseum.
   */
  const [lastConsole, setLastConsole] = useState(null)
  const [consoleOut, setConsoleOut] = useState('')
  patchConsole((stream, data) => {
    setLastConsole(data)

    const frameOut = lastConsole !== data ? consoleOut + data : consoleOut
    setConsoleOut(frameOut)
  })

  return (
    <Box display={isFocused ? 'flex' : 'none'} flexDirection="column">
      <Text>{consoleOut}</Text>
    </Box>
  )
}

BrowserSync.propTypes = {
  actions: PropTypes.object,
}

module.exports = {BrowserSync}
