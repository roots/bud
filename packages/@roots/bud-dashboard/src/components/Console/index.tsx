import {Dashboard} from '../../Dashboard'
import {
  Text,
  Box,
  patchConsole,
  React,
  useState,
  useEffect,
  Spinner,
} from '@roots/bud-support'
import {Logs} from './Logs'

export type Console = React.FunctionComponent<Dashboard.AppProps>

export type Log = React.FunctionComponent<{
  logs: {id: number; data: string}[]
}>

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
export const Console: Console = ({progress, theme}) => {
  const [logs, setLogs] = useState([])

  patchConsole((_, data) => {})

  useEffect(() => {
    progress?.message && setLogs([...logs, progress.message])
  }, [progress?.message])

  return logs?.length > 0 ? <Logs logs={logs} /> : <Loading />
}
