import {Dashboard} from '@roots/bud-framework'
import {
  Text,
  Box,
  React,
  useState,
  useEffect,
  Spinner,
} from '@roots/bud-support'
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
