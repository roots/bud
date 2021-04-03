import {React, Text, Box, Static} from '@roots/bud-support'
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
