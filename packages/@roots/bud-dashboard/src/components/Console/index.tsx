import {Dashboard} from '../../interface'
import React, {useState, useEffect} from 'react'
import {Text, Box} from 'ink'
import patchConsole from 'patch-console'
import Spinner from 'ink-spinner'

import {Logs} from './Logs'

export type Console = React.FunctionComponent<Dashboard.AppProps>
export type Log = React.FunctionComponent<{
  logs: {id: number; data: string}[]
}>

const Loading: React.FunctionComponent = () => (
  <Box flexDirection="column">
    <Text>
      <Spinner /> Watching
    </Text>
  </Box>
)

export const Console: Console = ({progress, theme}) => {
  const [logs, setLogs] = useState([])

  patchConsole((_, data) => {})

  useEffect(() => {
    progress?.message && setLogs([...logs, progress.message])
  }, [progress?.message])

  return logs?.length > 0 ? <Logs logs={logs} /> : <Loading />
}
