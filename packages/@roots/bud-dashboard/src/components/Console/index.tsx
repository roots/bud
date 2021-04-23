import {Dashboard} from '@roots/bud-framework'
import React, {useState, useEffect} from 'react'
import {Logs} from './Logs'

/**
 * Console
 */
export const Console: Dashboard.Component = ({progress}) => {
  const [logs, setLogs] = useState([])

  useEffect(() => {
    progress?.message && setLogs([...logs, progress.message])
  }, [progress?.message])

  return logs?.length > 0 ? <Logs logs={logs} /> : null
}
