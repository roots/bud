const React = require('react')
const {useEffect, useState} = React
const PropTypes = require('prop-types')
const {Text, Box, Color} = require('ink')
const webpack = require('webpack')
const build = require('./../build').webpack
const compiler = webpack(build())

/**
 * Budpack CLI interface
 *
 * @prop {object} cli
 */
const Budpack = ({cli}) => {
  const [mode, setMode] = useState(null)
  useEffect(() => {
    cli && cli.input && setMode(cli.input[0])
  }, [cli])

  const [stats, setStats] = useState(null)
  const [error, setError] = useState(null)
  useEffect(() => {
    const callback = (err, stats) => {
      ;(err || stats.hasErrors()) && setError(err)
      setStats(stats)
    }

    if (mode) {
      mode == 'build' && compiler.run(callback)
      mode == 'dev' && compiler.watch(null, callback)
    }
  }, [mode])

  const [assets, setAssets] = useState([])
  useEffect(() => {
    stats &&
      stats.compilation &&
      stats.compilation.assets &&
      setAssets(Object.keys(stats.compilation.assets))
  }, [stats])

  return (
    <Box flexDirection="column" marginTop={1}>
      <Box flexDirection="column">
        <Text>
          <Color green>Budpack</Color>
        </Text>
        {mode && <Text>Target: {mode}</Text>}
      </Box>

      {assets &&
        assets.map((asset, id) => (
          <Box key={id}>
            <Text>{asset}</Text>
          </Box>
        ))}

      {assets && mode == 'dev' && (
        <Box marginTop={2} marginBottom={2}>
          👀 Watching the days go by.
        </Box>
      )}

      {error && console.log(error)}
    </Box>
  )
}

Budpack.propTypes = {
  cli: PropTypes.object,
}

module.exports = Budpack
