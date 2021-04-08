import {React, Text, Box, Static} from '@roots/bud-support'
import {Logs} from './Logs'

export const StaticLogs: typeof Logs = ({logs}) => (
  <Box marginBottom={1} flexDirection="column">
    <Static items={logs}>
      {(log, id) => (
        <Box key={id} marginBottom={1} flexDirection="column">
          <Box>
            <Text>{log}</Text>
          </Box>
        </Box>
      )}
    </Static>
  </Box>
)
