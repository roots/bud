import React from 'react'
import {Text, Box, Static} from 'ink'
import {Log} from './'

export const StaticLogs: Log = ({logs}) => (
  <Box marginBottom={1} flexDirection="column">
    <Static items={logs}>
      {log => (
        <Box key={log.id}>
          <Text>{log.data}</Text>
        </Box>
      )}
    </Static>
  </Box>
)
