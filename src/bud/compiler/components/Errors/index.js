const React = require('react')
const {useEffect, useState} = React
const {Box, Text, useFocus} = require('ink')
const PropTypes = require('prop-types')

const {Error} = require('./Error')

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
    <Box display={display ? 'flex' : 'none'} flexDirection="column">
      {build?.errors?.length > 0 &&
        build?.errors[0] !== [] &&
        build?.errors?.map((err, i) => (
          <Error message={err} key={i} />
        ))}

      {build?.warnings?.length == 0 && (
        <Text>Nothing to see here.</Text>
      )}
    </Box>
  )
}

Errors.propTypes = {
  build: PropTypes.object,
  actions: PropTypes.object,
}

module.exports = {Errors}
