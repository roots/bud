const React = require('react')
const {Box, Text} = require('ink')
const {Bar} = require('./LoadingBar')
const PropTypes = require('prop-types')

/**
 * Loading (Progress Plugin)
 */
const Loading = ({build, width}) =>
  build?.percentage > 0 && build?.percentage < 1 ? (
    <Box
      maxWidth={width}
      textWrap="truncate"
      flexDirection="row">
      <Text bgcolor={'#171c56'}>
        <Text width={6}>
          {Math.round(build?.percentage * 100)}%
          {build?.percentage < 1 ? '  ' : ' '}
        </Text>
      </Text>

      <Text color={'#545DD7'}>
        <Bar
          character="█"
          percent={build?.percentage ?? 0.01}
        />
      </Text>
    </Box>
  ) : (
    []
  )

Loading.propTypes = {
  build: PropTypes.object,
  width: PropTypes.number,
}

module.exports = {Loading}
