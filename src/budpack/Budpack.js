import React, {useEffect, useState, useMemo} from 'react'
import PropTypes from 'prop-types'
import {Text, Box, Color} from 'ink'
import Spinner from 'ink-spinner'

import Banner from './components/Banner'

const useWebpack = ({compiler, mode}) => {
  const [errors, setErrors] = useState(null)
  const [stats, setStats] = useState(null)
  const cb = (errors, stats) => {
    errors && setErrors(errors)
    stats && setStats(stats)
  }

  useMemo(() => mode == 'dev'
    ? compiler.watch(null, cb)
    : compiler.run(cb),
    [mode, compiler],
  )

  return [stats, errors]
}

/**
 * Budpack CLI interface
 *
 * @prop {object} compiler webpack compiler
 * @prop {string} mode watch or run
 */
const Budpack = props => {
  const [mode] = useState(props.mode)
  const [stats, errors] = useWebpack(props)
  const [assets, setAssets] = useState(null)
  useEffect(() => {
    stats?.compilation?.assets && setAssets(
      Object.keys(stats.compilation.assets)
    )
  }, [stats])

  return (
    <Box flexDirection="column">
      <Banner />

      {assets && assets.map((asset, id) => (
        <Text key={id}>{asset}</Text>
      ))}

      <Box marginTop={1} marginBottom={1}>
        <Color green>
          {assets && (
            mode == 'dev' ? (
              <Text><Spinner /> Watching the days go by...</Text>
            ) : (
              <Text>Finished.</Text>
            )
          )}
        </Color>
      </Box>
    </Box>
  )
}

Budpack.propTypes = {
  stats: PropTypes.object,
  errors: PropTypes.object,
  mode: PropTypes.string,
}

module.exports = Budpack
