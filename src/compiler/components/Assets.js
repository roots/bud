const React = require('react')
const {useEffect} = React
const {Box, Spacer, Text, useFocus} = require('ink')
const PropTypes = require('prop-types')

/**
 * Indicator
 *
 * @prop {boolean} emitted
 * @return {PropTypes.ReactComponentLike}
 */
const Indicator = ({emitted}) => (
  <Text color={emitted ? '#545DD7' : '#6C758F'}>⦿ </Text>
)

Indicator.propTypes = {
  emitted: PropTypes.bool,
}

/**
 * Asset
 *
 * @prop {object} asset
 * @return {PropTypes.ReactComponentLike}
 */
const Asset = ({asset}) => {
  const display =
    asset.name.split('.').pop() == 'css' ||
    asset.name.split('.').pop() == 'js'

  return !display ? (
    []
  ) : (
    <Box flexDirection="row" justifyContent="space-between">
      <Box>
        <Indicator emitted={asset.emitted} />
        <Text color={asset.emitted ? 'white' : 'gray'}>
          {asset.name}
        </Text>
      </Box>
      <Spacer />
      <Box>
        <Text dimColor="white">{asset.size / 1000}kb</Text>
      </Box>
    </Box>
  )
}

Asset.propTypes = {
  asset: PropTypes.object,
}

/**
 * Assets
 *
 * @prop {object} build
 * @prop {object} actions
 * @prop {number} width
 * @return {PropTypes.ReactComponentLike}
 */
const Assets = ({build, actions}) => {
  const {isFocused} = useFocus({autoFocus: true})
  useEffect(() => {
    actions.setFocus({assets: isFocused})
  }, [isFocused])

  return (
    <Box
      display={isFocused ? 'flex' : 'none'}
      flexDirection="column">
      {build?.assets?.map((asset, id) => (
        <Asset key={id} asset={asset} />
      ))}
      {build?.assets?.length == 0 && <Text>Loading</Text>}
    </Box>
  )
}

Assets.propTypes = {
  build: PropTypes.object,
  actions: PropTypes.object,
  width: PropTypes.number,
}

module.exports = {Assets}
