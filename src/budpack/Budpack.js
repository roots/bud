import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {Text, Box, Color} from 'ink'

import Banner from './components/Banner'

/**
 * Budpack CLI interface
 *
 * @prop {object} cli
 */
const Budpack = ({compiler, cli}) => {
  const [mode, setMode] = useState(null)
  useEffect(() => {
    cli?.input?.[0] && setMode(cli.input[0])
  }, [cli])

  const [stats, setStats] = useState(null)
  const [error, setError] = useState(null)
  useEffect(() => {
    const callback = (err, stats) => {
      stats && setStats(stats)
      err && setError(err)
    }

    if (mode) {
      mode == 'build' && compiler.run(callback)
      mode == 'dev' && compiler.watch(null, callback)
    }
  }, [mode])

  const [assets, setAssets] = useState([])
  useEffect(() => {
    stats?.compilation?.assets && setAssets(
      Object.keys(stats.compilation.assets)
    )
  }, [stats])

  return (
    <Box flexDirection="column" marginTop={1}>
      <Banner />

      {assets && assets.map((asset, id) => (
        <Box key={id}>
          <Text>{asset}</Text>
        </Box>
      ))}

      {error && (
        <Text>{error}</Text>
      )}

      {mode == 'dev' && (
        <Box marginTop={2} marginBottom={2}>
          <Color green>Watching the days go by...</Color>
        </Box>
      )}
    </Box>
  )
}

Budpack.propTypes = {
  cli: PropTypes.object,
}

module.exports = Budpack
