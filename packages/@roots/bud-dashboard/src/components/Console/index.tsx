import {Dashboard} from '@roots/bud-framework'
import React, {useState, useEffect} from 'react'
import {Text, Box} from 'ink'
import Spinner from 'ink-spinner'
import {Logs} from './Logs'

/**
 * Loading
 */
const Loading: React.FunctionComponent = () => (
  <Box flexDirection="column">
    <Text>
      <Spinner /> Watching
    </Text>
  </Box>
)

/**
 * Console
 */
export const Console: Dashboard.Component = ({progress}) => {
  const [logs, setLogs] = useState([])

  useEffect(() => {
    progress?.message && setLogs([...logs, progress.message])
  }, [progress?.message])

  return logs?.length > 0 ? <Logs logs={logs} /> : <Loading />
}
